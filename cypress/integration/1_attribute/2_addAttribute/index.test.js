/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    And,
    Then,
} from 'cypress-cucumber-preprocessor/steps';

import {
    LANGUAGE,
} from '../../../defaults';
import {
    checkGridRow,
    noGridRow,
    removeOnGrid,
} from '../../../models/navigation';
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
    cy.apiRequest('POST', `${LANGUAGE}/attributes`).as('POST-REQUEST');
});

Then('I send a {string} request and status code should be {int}', (reqType, status) => {
    getToken();
    sendPostRequest({
        reqType,
        status,
        urlRegExp: /\/attributes$/,
    });
});

Then('On {string} I can see row {int} with columns data: {string}', (gridId, rowNr, columns) => {
    checkGridRow({
        gridId,
        rowNr,
        columns,
    });
});

And('On {string} I can not see row {int} with columns data: {string}', (gridId, rowNr, columns) => {
    noGridRow({
        gridId,
        rowNr,
        columns,
    });
});

Then('I remove {string} element by {string} request', (element, reqType) => {
    removeRequest({
        element,
        reqType,
        path: `${LANGUAGE}/attributes`,
    });
});

And('On {string} I click on {string} button for row {int}', (gridId, action, rowNr) => {
    removeOnGrid({
        gridId,
        action,
        rowNr,
    });
});
