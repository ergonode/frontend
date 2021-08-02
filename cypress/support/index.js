/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
// PLugin only for Chrome browser
import 'cypress-real-events/support';
import 'cypress-failed-log';

import {
    escapeStringRegexp,
} from '../models';

Cypress.Cookies.defaults({
    preserve: 'token',
});

Cypress.Server.defaults({
    force404: false,
    ignore: (xhr) => {
        const ignorePaths = [
            'notifications/check',
            'language/tree',
        ];
        const regexString = ignorePaths.reduce((acc, current) => `${acc === '' ? acc : `${acc}|`}${escapeStringRegexp(current)}`, '');
        const checkPath = new RegExp(`${regexString}$`, 'g');

        return checkPath.test(xhr.url);
    },
});
