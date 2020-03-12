#!/usr/bin/env node
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const pkg = require(path.join(__dirname, './../package.json'));
clear();
console.log('');
console.log(chalk.green(figlet.textSync('Ergonode', { horizontalLayout: 'full' })));
program
    .version(pkg.version)
    .description(pkg.description)
    .command('env', 'Creat .env file', { isDefault: true })
    .command('modules', 'Modules configuration')
    .command('modules-all', 'All modules configuration')
    .parse(process.argv); // allow commander to parse `process.argv`

program.on('command:*', () => {
    console.error(`${chalk.red('Invalid command: ', program.args.join(' '))}\n`);
    console.error(`${chalk.red('See --help for a list of available commands.')}\n`);
    process.exit(1);
});

if (program.args.length === 0) { // if no command display help info
    program.help();
}
