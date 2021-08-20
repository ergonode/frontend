/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Then,
} from 'cypress-cucumber-preprocessor/steps';

import {
    MultiSteps,
} from '../../../models/index';

const url = /multimedia/;

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    cy.intercept(
        {
            method: 'POST',
            url,
        },
    ).as(`${Cypress.spec.name}_POST`);
    cy.intercept(
        {
            method: 'GET',
            url,
        },
    ).as(`${Cypress.spec.name}_GET`);
});

MultiSteps([
    Then,
], 'Uploaded file {string} extension is not supported', (file) => {
    cy
        .get('.upload-file-list-element')
        .contains(file)
        .should('exist')
        .as('listElement');
    cy
        .get('@listElement')
        .get('.upload-file-list-element')
        .should('have.class', 'upload-file-list-element--error');
});
