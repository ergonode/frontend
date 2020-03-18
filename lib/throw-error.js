/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const chalk = require('chalk');

module.exports.throwError = (message) => {
    console.log(chalk.red('------'));
    console.error(chalk.red('ERROR:'), message);
    console.log(chalk.red('------'));
    throw new Error(message);
};
