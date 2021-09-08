#!/usr/bin/env node
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const fs = require('fs');
const {
    throwError,
} = require('./throw-error');
const {
    _availableModules,
} = require('../package');

(async function allModules() {
    const moduleStr = array => array.reduce((acc, module, i) => {
        const tabs = i === 0 ? '' : '\t\t\t\t';
        const enter = i === array.length - 1 ? '' : '\n';

        return `${acc}${tabs}'${module}',${enter}`;
    }, '');
    const typeModules = type => Object.keys(_availableModules).filter(
        m => _availableModules[m] === type,
    );
    const copyright = fs.readFileSync('./config/.copyright', 'utf8');
    const fileStr = `${copyright}export default {
${typeModules('local').length ? `\t\tlocal: [\n\t\t\t\t${moduleStr(typeModules('local'))}\n\t\t],` : ''}
${typeModules('npm').length ? `\t\tnpm: [\n\t\t\t\t${moduleStr(typeModules('npm'))}\n\t\t],` : ''}
};`;

    fs.writeFile('./modules.config.js', fileStr, (err) => {
        if (err) throwError(err);
    });
}());
