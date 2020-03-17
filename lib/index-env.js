#!/usr/bin/env node
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const { throwError } = require('./throw-error');

async function createEnv() {
    const env = {
        API_BASE_URL: null,
    };
    console.log(chalk.yellow('Set your API URL!'));
    const {
        protocol, host, port, apiPrefix,
    } = await inquirer.prompt([
        {
            type: 'list',
            name: 'protocol',
            default: 'http',
            message: 'Select your HOST protocol.',
            choices: ['http', 'https'],
        },
        {
            name: 'host',
            message: 'Enter API URL host name.',
            default: 'localhost',
        },
        {
            type: 'list',
            name: 'ifPort',
            default: 'yes',
            message: 'Is port exist?',
            choices: ['no', 'yes'],
        },
        {
            name: 'port',
            message: 'Enter URL port.',
            default: '8000',
            when: ({ ifPort }) => ifPort === 'yes',
        },
        {
            name: 'apiPrefix',
            message: 'Enter api prefix.',
            default: '/api/v1/',
        },
        {
            name: 'apiPrefix',
            message: 'Enter api prefix.',
            default: '/api/v1/',
        },
    ]);

    env.API_BASE_URL = `${protocol}://${host}`;
    if (port) {
        env.API_BASE_URL += ':8000';
    }

    env.API_BASE_URL += apiPrefix;

    const envStr = Object.keys(env).reduce((acc, key) => (env[key] ? `${acc}${key}=${env[key]}\n` : acc), '');

    fs.writeFile('.env', envStr, (err) => {
        if (err) throwError(err);
        console.log(chalk.green('File created!'));
    });
}
createEnv();
