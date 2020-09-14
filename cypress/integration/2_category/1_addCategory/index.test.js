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
    sendRequest,
} from '../../../models/requests';

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    Cypress.Cookies.preserveOnce('jwt');
    cy.apiRequest('POST', `${LANGUAGE}/categories`)
        .as('POST-REQUEST');
});

Then('I send a {string} request and status code should be {int}', (reqType, status) => {
    getToken();
    sendRequest({
        reqType,
        status,
        urlRegExp: /\/categories$/,
    });
});

Then('I remove element by {string} request', (element, reqType) => {
    removeRequest({
        element,
        reqType,
        path: `${LANGUAGE}/categories`,
    });
});
