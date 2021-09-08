/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
    actionOnGrid,
    checkGridRow,
} from '../../../models/navigation';

const url = /roles/;

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    cy.intercept(
        {
            method: 'GET',
            url,
        },
    ).as(`${Cypress.spec.name}_GET`);
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} I can see row with {string} value and columns data: {string}', (gridId, searchValue, columns) => {
    checkGridRow({
        gridId,
        searchValue,
        columns,
        showMoreRows: false,
    });
});

MultiSteps([
    And,
    Then,
], 'On {string} I click on {string} button for row with {string} value', (gridId, action, searchValue) => {
    actionOnGrid({
        gridId,
        action,
        searchValue,
        showMoreRows: false,
    });
});
