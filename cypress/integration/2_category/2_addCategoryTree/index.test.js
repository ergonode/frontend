/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Then,
} from 'cypress-cucumber-preprocessor/steps';

import {
    LANGUAGE,
} from '../../../defaults';
import {
    getToken,
    removeRequest,
    sendPostRequest,
} from '../../../models/requests';

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    Cypress.Cookies.preserveOnce('jwt');
    cy.apiRequest('POST', `${LANGUAGE}/trees`).as('POST-REQUEST');
});

Then('I send a {string} request and status code should be {int}', (reqType, status) => {
    getToken();
    sendPostRequest({
        reqType,
        status,
        urlRegExp: /\/trees$/,
    });
});

Then('I remove {string} element by {string} request', (element, reqType) => {
    removeRequest({
        element,
        reqType,
        path: `${LANGUAGE}/trees`,
    });
});
