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

MultiSteps([
    When,
    Then,
], 'I fill the {string} input with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`)
        .find('input')
        .clear()
        .type(term)
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
], 'I can see {string} input as disabled', (id) => {
    cy.get(`[data-cy=${id}]`)
        .find('input')
        .should('have.attr', 'disabled', 'disabled');
});

MultiSteps([
    When,
    Then,
], 'I can see {string} input as enabled', (id) => {
    cy.get(`[data-cy=${id}]`)
        .find('input')
        .should('not.have.attr', 'disabled');
});

MultiSteps([
    Then,
    And,
], 'I fill the {string} input with the {string} term for {string} translation', (id, term, language) => {
    const name = `${id}_${language}`;

    cy.get(`[data-cy=${name}]`)
        .find('input')
        .clear()
        .type(term)
        .should('have.value', term);
});

MultiSteps([
    Then,
    And,
], 'I fill the {string} textarea with the {string} term for {string} translation', (id, term, language) => {
    const name = `${id}_${language}`;

    cy.get(`[data-cy=${name}]`)
        .find('textarea')
        .clear()
        .type(term)
        .should('have.value', term);
});

MultiSteps([
    Then,
    And,
], 'I fill the {string} input for index {int} with the {string} term for {string} translation', (id, index, term, language) => {
    const name = `${id}_${language}_${index}`;

    cy.get(`[data-cy=${name}]`)
        .find('input')
        .clear()
        .type(term)
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
], 'I choose {int} option from {string} select field', (optionNr, id) => {
    cy.get(`[data-cy=${id}]`)
        .click();
    cy.get(`[data-cy=${id}-drop-down]`)
        .should('be.visible')
        .find('.list > .list-element')
        .as('elementList');
    cy.get('@elementList')
        .its('length')
        .should('be.gt', 0);
    cy.get('@elementList')
        .eq(optionNr)
        .as('selectedOption');
    cy.get('@selectedOption')
        .click({
            force: true,
        });
    cy.get('@selectedOption')
        .then(($option) => {
            const optionValue = new RegExp($option.text()
                .trim()
                .replace('#', ''));

            cy.get(`[data-cy=${id}-value] span`)
                .contains(optionValue);
        });
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
