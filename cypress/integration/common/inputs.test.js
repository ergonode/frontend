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
    And,
], 'I select the {string} file in the {string} input', (files, id) => {
    const parsedFiles = JSON.parse(files.replace(/'/g, '"')).map(file => `files/${file}`);

    cy.getBySel(id).attachFile(parsedFiles);
});

MultiSteps([
    When,
    Then,
    And,
], 'I fill the {string} input with the {string} term', (id, term) => {
    cy.getBySel(id)
        .find('input')
        .fill(term)
        .should('have.value', term);
});

MultiSteps([
    When,
    Then,
], 'I fill the {string} textarea with the {string} term', (id, term) => {
    cy.getBySel(id)
        .find('textarea')
        .fill(term)
        .should('have.value', term);
});

MultiSteps([
    When,
    Then,
], 'I can see {string} input with the {string} term', (id, term) => {
    cy.getBySel(id)
        .find('input')
        .should('have.value', term);
});

MultiSteps([
    When,
    Then,
], 'I can see {string} checkbox with the {string} value', (id, value) => {
    if (value === 'false') {
        cy.getBySel(id)
            .find('input')
            .should('be.not.checked');
    } else if (value === 'true') {
        cy.getBySel(id)
            .find('input')
            .should('be.checked');
    }
});

MultiSteps([
    When,
    Then,
], 'I can see {string} textarea with the {string} term', (id, term) => {
    cy.getBySel(id)
        .find('textarea')
        .should('have.value', term);
});

MultiSteps([
    When,
    Then,
], 'I can see {string} select with the {string} term', (id, term) => {
    cy.getBySel(id)
        .find('.input-select-value')
        .should(($ele) => {
            expect($ele.text().trim()).equal(term);
        });
});

MultiSteps([
    When,
    Then,
], 'I can see {string} select as not empty', (id) => {
    cy.getBySel(id)
        .find('.input-select-value')
        .should(($ele) => {
            expect($ele.text().trim()).not.equal('');
        });
});

MultiSteps([
    When,
    Then,
], 'I can see {string} field as disabled', (id) => {
    cy.getBySel(id)
        .find('input, select, textarea')
        .should('have.attr', 'disabled', 'disabled');
});

MultiSteps([
    When,
    Then,
], 'I can see {string} field as enabled', (id) => {
    cy.getBySel(id)
        .find('input, select, textarea')
        .should('not.have.attr', 'disabled');
});

MultiSteps([
    Then,
    And,
], 'I fill the {string} input with the {string} term for {string} translation', (id, term, language) => {
    cy.getBySel(`${id}_${language}`)
        .find('input')
        .fill(term)
        .should('have.value', term);
});

MultiSteps([
    Then,
    And,
], 'I fill the {string} textarea with the {string} term for {string} translation', (id, term, language) => {
    cy.getBySel(`${id}_${language}`)
        .find('textarea')
        .fill(term)
        .should('have.value', term);
});

MultiSteps([
    Then,
    And,
], 'I fill the {string} input for index {int} with the {string} term for {string} translation', (id, index, term, language) => {
    cy.getBySel(`${id}_${language}_${index}`)
        .find('input')
        .fill(term)
        .should('have.value', term);
});

MultiSteps([
    Then,
    And,
], 'I click {string} check', (id) => {
    cy.getBySel(id)
        .find('label')
        .click();
});

MultiSteps([
    And,
    Then,
], 'I choose {int} option from {string} color picker field', (optionNr, id) => {
    cy.getBySel(id)
        .click();
    cy.getBySel(`${id}-dropdown`)
        .as('dropDown');
    cy.get('@dropDown')
        .should('be.visible')
        .find('.color-picker-content > .color').as('elementList');
    cy.get('@elementList').its('length').should('be.gt', 0);
    cy.get('@elementList').eq(optionNr).as('selectedOption');
    cy.get('@selectedOption').click();
    cy.get('@dropDown').find('button').contains('OK').click();
    cy.get('@dropDown').should('be.not.visible');
});

MultiSteps([
    And,
    Then,
], 'I choose {string} option from {string} select field', (option, id) => {
    cy.getBySel(id).chooseSelectOption(option);
});

MultiSteps([
    And,
    Then,
], 'I choose {string} option(s) from {string} multi select field', (optionNrs, id) => {
    cy.getBySel(id)
        .click();
    cy.getBySel(`${id}-dropdown`)
        .as('dropdown');
    cy.get('@dropdown')
        .should('be.visible')
        .find('.list-element')
        .as('elementList');
    cy.get('@elementList')
        .its('length')
        .should('be.gt', 0);
    cy.wrap(JSON.parse(optionNrs))
        .each((optionNr) => {
            cy.get('@elementList')
                .eq(optionNr)
                .as('selectedOption');
            cy.get('@selectedOption')
                .click();
        });
    cy.get('@dropdown')
        .find('button')
        .contains('OK')
        .click();
    cy.get('@dropdown')
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
