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
} from '../../models';
import {
    checkGridRow,
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
    const url = page.replace(/%\w+%/g, '(.*?)');

    cy.url()
        .should('match', new RegExp(url));
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
    const parsedErrors = JSON.parse(errors.replace(/'/g, '"'));

    cy
        .get('[data-cy=form-errors]')
        .should('be.visible')
        .as('formErrorsWrapper');
    cy
        .get('@formErrorsWrapper')
        .find('.errors-list__links > button')
        .as('errorList');

    cy.get('@errorList')
        .should('have.length', parsedErrors.length)
        .each(($error, i) => {
            expect($error.find('span').text().trim()).to.equal(parsedErrors[i]);
        });
});
