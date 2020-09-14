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

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    cy
        .route({
            method: 'POST',
            url: '**/templates',
        })
        .as('addTemplate');
    cy
        .route({
            method: 'DELETE',
            url: '**/templates',
        })
        .as('removeTemplate');
    cy
        .route({
            method: 'GET',
            url: '**/templates?offset=0&limit=25&extended=true&filter=&columns=',
        })
        .as('templates');
});

Then('I send a {string} request and status code should be {int}', (reqType, status) => {
    cy
        .wait('@addTemplate')
        .should((xhr) => {
            expect(xhr.status, 'Successful response').to.equal(status);
        });
    cy
        .get('[data-cy=modal]')
        .should('be.not.visible');
    cy.wait('@templates');
});

Then('I remove element by {string} request', (element, reqType) => {
    // removeRequest({
    //     element,
    //     reqType,
    //     path: `${LANGUAGE}/templates`,
    // });
});

MultiSteps([
    Given,
    And,
], 'I open {string} page', (page) => {
    cy.visit(`/${page}`);
    cy.wait('@templates');
    cy
        .url()
        .should('include', `/${page}`);
});
