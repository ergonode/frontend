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
    getToken,
    removeRequest,
    sendPostRequest,
} from '../../../models/requests';

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    Cypress.Cookies.preserveOnce('jwt');
    cy.apiRequest('POST', `${LANGUAGE}/status`).as('POST-REQUEST');
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

Then('I send a {string} request and status code should be {int}', (reqType, status) => {
    getToken();
    sendPostRequest({
        reqType,
        status,
        urlRegExp: /\/status$/,
    });
});

Then('I remove {string} element by {string} request', (element, reqType) => {
    removeRequest({
        element,
        reqType,
        path: `${LANGUAGE}/status`,
    });
});
