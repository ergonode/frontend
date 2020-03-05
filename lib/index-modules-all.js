#!/usr/bin/env node
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
require('@babel/register')({
    presets: ['@babel/preset-env'],
});
const fs = require('fs');
const { throwError } = require('./throw-error');
const { _availableModules } = require('../package');

(async function () {
    const moduleStr = Object.keys(_availableModules).reduce((acc, module, i) => {
        const tabs = i === 0 ? '' : '\t\t\t\t';
        const enter = i === Object.keys(_availableModules).length - 1 ? '' : '\n';

        return `${acc}${tabs}'${module}',${enter}`;
    }, '');
    const copyright = fs.readFileSync('./config/.copyright', 'utf8');
    const fileStr = `${copyright}export default {
    active: [
        ${moduleStr}
    ],
};`;

    fs.writeFile('./modules.config.js', fileStr, (err) => {
        if (err) throwError(err);
    });
}());
