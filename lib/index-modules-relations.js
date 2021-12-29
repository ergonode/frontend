#!/usr/bin/env node
/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
require('@babel/register')({
    presets: [
        '@babel/preset-env',
    ],
});

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const modules = require('../modules.config');
const {
    throwError,
} = require('./throw-error');
const {
    _requiredModules,
} = require('../package');

const LOCAL_MODULES_DIR = 'modules';
const IGNORE_PHRASES = [
    './state',
    './actions',
    './getters',
    './mutations',
    './config',
    '.nuxt',
    'vue',
    'vuex',
    'debounce',
    'date-fns',
    'deepmerge',
    'tiptap',
    'path',
    'camelcase-keys',
    'git-repo-info',
    'axios',
    'v-mask',
];
const IGNORE_FILES = [
    'config/index.js',
    'locales',
    '__tests__',
];
const DEFAULT_MODULES = [
    ..._requiredModules,
];
const STORE_CALLING = '\\.\\.\\.(mapActions|mapState|mapGetters)';

const getAllFiles = (dirPath, filesArray = []) => {
    let arrayOfFiles = filesArray || [];
    const files = fs.readdirSync(dirPath);
    const regex = new RegExp(IGNORE_FILES.join('|'));

    files.filter(file => !regex.test(`${dirPath}/${file}`)).forEach((file) => {
        if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
            arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, '/', file));
        }
    });

    return arrayOfFiles;
};

const searchFiles = (filePath, regEx) => new Promise((resolve) => {
    const result = [];

    fs.readFile(filePath, 'utf8', (err, contents) => {
        if (err) throw throwError(err);
        const lines = contents.toString().split('\n');

        lines.forEach((line, index) => {
            if (line && line.search(regEx) >= 0) {
                result.push({
                    line,
                    lineNumber: index + 1,
                    file: filePath,
                });
            }
        });
        resolve(result);
    });
});

const getDirectories = (source) => {
    if (!fs.existsSync(source)) return null;

    return fs.readdirSync(source, {
        withFileTypes: true,
    })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
};

const getModuleConfig = (moduleDir) => {
    const moduleConfig = require(`../${LOCAL_MODULES_DIR}/${moduleDir}/src/config/index.js`);
    const {
        default: {
            name,
            aliases = {},
            relations = [],
        },
    } = moduleConfig;

    return {
        name,
        aliases,
        relations,
    };
};

(async function modulesRelationsDetector() {
    const {
        default: {
            local = [],
        },
    } = modules;
    const modulesRelations = [];

    console.log(chalk.yellow('Check modules relations'));

    await Promise.all(local.map(async (moduleDir) => {
        try {
            const awaitFiles = [];
            const moduleConfig = getModuleConfig(moduleDir);
            const moduleAliases = Object.keys(moduleConfig.aliases);
            const allFiles = getAllFiles(`./${LOCAL_MODULES_DIR}/${moduleDir}/src`);
            const relationConfig = [
                ...moduleConfig.relations,
                ...DEFAULT_MODULES,
            ].map(relationModule => getModuleConfig(relationModule));
            const correctAlias = [
                ...new Set([
                    ...moduleAliases,
                    ...relationConfig.map(r => Object.keys(r.aliases)),
                ].flat()),
            ].map(alias => `${alias}/`);
            const modulesStoreDirs = [
                ...new Set([
                    moduleDir,
                    ...relationConfig.map(r => r.name),
                ]),
            ].map(module => getDirectories(`./${LOCAL_MODULES_DIR}/${module}/src/store`)).flat();

            await Promise.all(allFiles.map(async (file) => {
                const searchImport = new RegExp(`from '(?:(?!${[
                    ...correctAlias,
                    ...IGNORE_PHRASES,
                ].join('|')}).)*$`, 'gim');
                const searchStore = new RegExp(`${STORE_CALLING}(?:(?!${[
                    ...new Set(modulesStoreDirs),
                ].join('|')}).)*$`, 'gim');

                const importsFound = await searchFiles(file, searchImport);
                const storeFound = await searchFiles(file, searchStore);

                if (importsFound.length) {
                    awaitFiles.push(...importsFound);
                }
                if (storeFound.length) {
                    awaitFiles.push(...storeFound);
                }
            }));

            const findingRelations = await Promise.all(awaitFiles);

            if (findingRelations.length) {
                modulesRelations.push({
                    name: moduleDir,
                    findingRelations,
                });
            }
        } catch (e) {
            throwError(e);
        }
    }));

    if (modulesRelations.length) {
        console.log(chalk.red('Erroneous relations were found !'));
        modulesRelations.forEach((relations) => {
            if (relations.findingRelations.length) {
                console.log(relations);
            }
        });
    } else {
        console.log(chalk.green('All relations seem to be ok :)'));
    }
}());
