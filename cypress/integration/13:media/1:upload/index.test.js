/* eslint-disable cypress/no-unnecessary-waiting */
/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    And,
    Then,
    When,
} from 'cypress-cucumber-preprocessor/steps';

import {
    MultiSteps,
} from '../../../models/index';
import {
    checkGridRows,
} from '../../../models/navigation';

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

// TODO: not waiting on upload action
MultiSteps([
    And,
    Then,
    When,
], 'On {string} I can see rows with {string} values', (id, values) => {
    cy.wait(100);
    checkGridRows({
        id,
        values,
    });
});
