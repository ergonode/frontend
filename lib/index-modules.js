#!/usr/bin/env node
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
require('@babel/register')({
    presets: ['@babel/preset-env'],
});

const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const { throwError } = require('./throw-error');
const { _requiredModules, _availableModules } = require('../package');

(async function selectModules() {
    console.log(chalk.yellow('Select your modules'));

    const options = Object.keys(_availableModules).map(module => (_requiredModules.includes(module)
        ? { name: module, disabled: 'Required', checked: true }
        : { name: module, checked: true }));
    const { modules } = await inquirer.prompt([
        {
            type: 'checkbox',
            pageSize: 15,
            name: 'modules',
            message: 'Select your modules',
            choices: options,
        },
    ]);
    const selectedModules = [..._requiredModules, ...modules];
    const typeModules = type => Object.keys(_availableModules).filter(
        m => selectedModules.includes(m) && _availableModules[m] === type,
    );
    const moduleStr = array => array.reduce((acc, module, i) => {
        const tabs = i === 0 ? '' : '\t\t\t\t';
        const enter = i === array.length - 1 ? '' : '\n';

        return `${acc}${tabs}'${module}',${enter}`;
    }, '');
    const copyright = fs.readFileSync('./config/.copyright', 'utf8');
    const fileStr = `${copyright}export default {
${typeModules('local').length ? `\t\tlocal: [\n\t\t\t\t${moduleStr(typeModules('local'))}\n\t\t],` : ''}
${typeModules('npm').length ? `\t\tnpm: [\n\t\t\t\t${moduleStr(typeModules('npm'))}\n\t\t],` : ''}
};`;

    fs.writeFile('./modules.config.js', fileStr, (err) => {
        if (err) throwError(err);
        console.log(chalk.green('File created!'));
    });
}());
