/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    And,
    Given,
    Then,
    When,
} from 'cypress-cucumber-preprocessor/steps';

import {
    MultiSteps,
} from '../../models';
import {
    checkGridRow,
    checkGridRows,
    noGridRow,
} from '../../models/navigation';

MultiSteps([
    Then,
    And,
], 'Element {string} is visible', (id) => {
    cy.get(`[data-cy=${id}]`)
        .should('be.visible');
});

MultiSteps([
    Then,
    And,
], 'Element {string} is not visible', (id) => {
    cy.get(`[data-cy=${id}]`)
        .should('not.visible');
});

MultiSteps([
    Then,
    And,
], 'Element {string} not exist', (id) => {
    cy.get(`[data-cy=${id}]`)
        .should('not.exist');
});

MultiSteps([
    Then,
    And,
], 'I can see {string} text on {string} element', (text, id) => {
    cy.get(`[data-cy=${id}]`)
        .should(($ele) => {
            expect($ele.text().trim()).equal(text);
        });
});

MultiSteps([
    Then,
    And,
], 'I see {string} page', (page) => {
    cy.checkUrl(page);
});

Given('I open {string} page', (page) => {
    cy.openPage({
        page,
        requestAliases: [
            `@${Cypress.spec.name}_GET`,
        ],
    });
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
    });
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} I can see rows with {string} values', (id, values) => {
    checkGridRows({
        id,
        values,
    });
});

MultiSteps([
    And,
    Then,
], 'On {string} I can not see row with {string} value', (gridId, searchValue) => {
    noGridRow({
        gridId,
        searchValue,
    });
});

MultiSteps([
    Then,
    And,
], 'I see a form validation error that says {string}', (errors) => {
    const parsedErrors = JSON.parse(errors.replace(/'/g, '"').replace(/`/g, "'").replace(/\/"/g, "'"));

    cy
        .get('[data-cy=form-errors]')
        .should('be.visible')
        .as('formErrorsWrapper');
    cy
        .get('@formErrorsWrapper')
        .find('.errors-list > button')
        .as('errorList');

    cy.get('@errorList')
        .should('have.length', parsedErrors.length);

    parsedErrors.forEach((error) => {
        cy.get('@errorList').contains('span', error);
    });
});
