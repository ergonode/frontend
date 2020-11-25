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

const requestName = 'statusRequest';
const url = 'status';

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    Cypress.Cookies.preserveOnce('token');
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
        url: 'status?offset=0&limit=25&extended=true&filter=&columns=',
        alias: `${requestName}_GET_GRID`,
    });

    cy.apiRequest({
        method: 'GET',
        url: 'status/**',
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
        path: 'status',
    });
});

And('I choose {int} option from {string} color picker field', (optionNr, id) => {
    cy.get(`[data-cy=${id}]`).click();
    cy.get(`[data-cy=${id}-drop-down]`)
        .should('be.visible')
        .find('.color-picker-content > .color').as('elementList');
    cy.get('@elementList').its('length').should('be.gt', 0);
    cy.get('@elementList').eq(optionNr).as('selectedOption');
    cy.get('@selectedOption').click({
        force: true,
    });
    cy.get(`[data-cy=${id}-drop-down]`).find('button').contains('OK').click();
    cy.get(`[data-cy=${id}-drop-down]`).should('be.not.visible');
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
