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
const { REQUIRED_MODULES, CORE_MODULES } = require('../defaults/modules');

(async function () {
    console.log(chalk.yellow('Select your modules'));

    const options = Object.keys(CORE_MODULES).map(module => (REQUIRED_MODULES.includes(module)
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
    const selectedModules = REQUIRED_MODULES.concat(modules);
    const inactiveModules = Object.keys(CORE_MODULES).filter(x => !selectedModules.includes(x));
    const moduleStr = array => array.reduce((acc, module, i) => {
        const tabs = i === 0 ? '' : '\t\t\t\t';
        const enter = i === array.length - 1 ? '' : '\n';

        return `${acc}${tabs}'${module}',${enter}`;
    }, '');
    const copyright = fs.readFileSync('./config/.copyright', 'utf8');
    const fileStr = `${copyright}export default {
    active: [
        ${moduleStr(selectedModules)}
    ],${inactiveModules.length ? `\n\t\tinactive: [\n\t\t\t\t${moduleStr(inactiveModules)}\n\t\t],` : ''}
};`;

    fs.writeFile('./config/.modules.js', fileStr, (err) => {
        if (err) throwError(err);
        console.log(chalk.green('File created!'));
    });
}());
