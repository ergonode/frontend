#!/usr/bin/env node
/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const chalk = require('chalk');
const envinfo = require('envinfo');

const showEnvInfo = async () => {
    console.log(chalk.bold('\nEnvironment Info:'));
    const result = await envinfo
        .run({
            System: [
                'OS',
                'CPU',
                'Memory',
            ],
            Binaries: [
                'Node',
                'Yarn',
                'npm',
            ],
            Browsers: [
                'Chrome',
                'Edge',
                'Firefox',
                'Safari',
            ],
            npmGlobalPackages: [
                'nuxt',
            ],
        });
    console.log(result);
};

showEnvInfo();
