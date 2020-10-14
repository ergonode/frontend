/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    And,
    Given,
    Then,
} from 'cypress-cucumber-preprocessor/steps';

import {
    MultiSteps,
} from '../../../models/index';
import {
    removeRequest,
    sendRequest,
} from '../../../models/requests';

const requestName = 'unitsRequest';
const url = 'units';

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    Cypress.Cookies.preserveOnce('jwt');
    cy.apiRequest({
        method: 'POST',
        url,
        alias: `${requestName}_POST`,
    });

    cy.apiRequest({
        method: 'PUT',
        url,
        alias: `${requestName}_PUT`,
    });

    cy.apiRequest({
        method: 'DELETE',
        url,
        alias: `${requestName}_DELETE`,
    });

    cy.apiRequest({
        method: 'GET',
        url: 'units?offset=0&limit=25&extended=true&filter=&columns=',
        alias: `${requestName}_GET_GRID`,
    });

    cy.apiRequest({
        method: 'GET',
        url: 'units/**',
        alias: `${requestName}_GET`,
    });
});

MultiSteps([
    Then,
    And,
], 'I send a {string} request and status code should be {int}', (reqType, status) => {
    sendRequest({
        reqType,
        status,
        requestName,
    });
});

Then('I remove element by request', () => {
    removeRequest({
        path: 'units',
    });
});

MultiSteps([
    Given,
    And,
], 'I open {string} page', (page) => {
    cy.visit(`/${page}`);
    // cy.wait(`@${requestName}_GET_GRID`);
    cy
        .url()
        .should('include', `/${page}`);
});

MultiSteps([
    Then,
    And,
], 'I wait for {string} request', (type) => {
    cy.wait(`@${requestName}_${type}`);
});
