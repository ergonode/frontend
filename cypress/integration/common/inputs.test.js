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
} from '../../models';
import {
    editOnGrid,
} from '../../models/navigation';

MultiSteps([
    When,
    Then,
], 'I fill the {string} input with the {string} term', (id, term) => {
    cy.get(`form [data-cy=${id}]`)
        .find('input')
        .fill(term)
        .should('have.value', term);
});

MultiSteps([
    When,
    Then,
], 'I fill the {string} textarea with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`)
        .find('textarea')
        .fill(term)
        .should('have.value', term);
});

MultiSteps([
    When,
    Then,
], 'I can see {string} input with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`)
        .find('input')
        .should('have.value', term);
});

MultiSteps([
    When,
    Then,
], 'I can see {string} input with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`)
        .find('input')
        .should('have.value', term);
});

MultiSteps([
    When,
    Then,
], 'I can see {string} checkbox with the {string} value', (id, value) => {
    if (value === 'false') {
        cy.get(`[data-cy=${id}]`)
            .find('input')
            .should('be.not.checked');
    } else if (value === 'true') {
        cy.get(`[data-cy=${id}]`)
            .find('input')
            .should('be.checked');
    }
});

MultiSteps([
    When,
    Then,
], 'I can see {string} textarea with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`)
        .find('textarea')
        .should('have.value', term);
});

MultiSteps([
    When,
    Then,
], 'I can see {string} select with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`)
        .find('.input-select-value')
        .should(($ele) => {
            expect($ele.text().trim()).equal(term);
        });
});

MultiSteps([
    When,
    Then,
], 'I can see {string} select as not empty', (id) => {
    cy.get(`[data-cy=${id}]`)
        .find('.input-select-value')
        .should(($ele) => {
            expect($ele.text().trim()).not.equal('');
        });
});

MultiSteps([
    When,
    Then,
], 'I can see {string} field as disabled', (id) => {
    cy.get(`[data-cy=${id}]`)
        .find('input, select, textarea')
        .should('have.attr', 'disabled', 'disabled');
});

MultiSteps([
    When,
    Then,
], 'I can see {string} field as enabled', (id) => {
    cy.get(`[data-cy=${id}]`)
        .find('input, select, textarea')
        .should('not.have.attr', 'disabled');
});

MultiSteps([
    Then,
    And,
], 'I fill the {string} input with the {string} term for {string} translation', (id, term, language) => {
    const name = `${id}_${language}`;

    cy.get(`[data-cy=${name}]`)
        .find('input')
        .fill(term)
        .should('have.value', term);
});

MultiSteps([
    Then,
    And,
], 'I fill the {string} textarea with the {string} term for {string} translation', (id, term, language) => {
    const name = `${id}_${language}`;

    cy.get(`[data-cy=${name}]`)
        .find('textarea')
        .fill(term)
        .should('have.value', term);
});

MultiSteps([
    Then,
    And,
], 'I fill the {string} input for index {int} with the {string} term for {string} translation', (id, index, term, language) => {
    const name = `${id}_${language}_${index}`;

    cy.get(`[data-cy=${name}]`)
        .find('input')
        .fill(term)
        .should('have.value', term);
});

MultiSteps([
    Then,
    And,
], 'I click {string} check', (id) => {
    cy.get(`[data-cy=${id}]`)
        .find('label')
        .click();
});

MultiSteps([
    And,
    Then,
], 'I choose {int} option from {string} color picker field', (optionNr, id) => {
    cy.get(`[data-cy=${id}]`).click();
    cy.get(`[data-cy=${id}-drop-down]`)
        .should('be.visible')
        .find('.color-picker-content > .color').as('elementList');
    cy.get('@elementList').its('length').should('be.gt', 0);
    cy.get('@elementList').eq(optionNr).as('selectedOption');
    cy.get('@selectedOption').click();
    cy.get(`[data-cy=${id}-drop-down]`).find('button').contains('OK').click();
    cy.get(`[data-cy=${id}-drop-down]`).should('be.not.visible');
});

MultiSteps([
    And,
    Then,
], 'I choose {string} option from {string} select field', (optionString, id) => {
    cy.get(`[data-cy=${id}]`)
        .click();
    cy.get(`[data-cy=${id}-drop-down]`)
        .should('be.visible')
        .find('.list-element')
        .as('elementList');
    cy.get('@elementList')
        .its('length')
        .should('be.gt', 0);
    cy.get('@elementList')
        .each(($option) => {
            if ($option.text().trim() === optionString) {
                expect($option.text().trim()).equal(optionString);
                cy.wrap($option).as('selectedOption');
            }
        });
    cy.get('@selectedOption')
        .click({
            force: true,
        });
    cy.get(`[data-cy=${id}-value] span`)
        .contains(optionString);
    cy.get(`[data-cy=${id}-drop-down]`)
        .should('be.not.visible');
});

MultiSteps([
    And,
    Then,
], 'I choose {string} option(s) from {string} multi select field', (optionNrs, id) => {
    const parsedOptions = JSON.parse(optionNrs);

    cy.get(`[data-cy=${id}]`)
        .click()
        .should('be.visible');
    cy.get(`[data-cy=${id}-drop-down]`)
        .should('be.visible')
        .find('.list-element')
        .as('elementList');
    cy.get('@elementList')
        .its('length')
        .should('be.gt', 0);
    cy.wrap(parsedOptions)
        .each((optionNr) => {
            cy.get('@elementList')
                .eq(optionNr)
                .as('selectedOption');
            cy.get('@selectedOption')
                .click();
        });
    cy.get(`[data-cy=${id}-drop-down]`)
        .find('button')
        .contains('OK')
        .click();
    cy.get(`[data-cy=${id}-drop-down]`)
        .should('be.not.visible');
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} I edit {string} fields for row with {string} value', (gridId, columns, searchValue) => {
    editOnGrid({
        gridId,
        searchValue,
        columns,
    });
});
