/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Given, Then, When, And,
} from 'cypress-cucumber-preprocessor/steps';

Given('I open {string} page', (page) => {
    cy.visit(`/${page}`);
    cy.url().should('include', `/${page}`);
});

When('I click on {string} button', (id) => {
    cy.get(`[data-cy=${id}]`).click();
});

When('On {string} element I click button with {string} text', (id, text) => {
    cy.get(`[data-cy=${id}]`).find('button').contains(text).click();
});

When('I fill the {string} input with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`).find('input').type(term).should('have.value', term);
});

Then('Element {string} is {string}', (id, state) => {
    cy.get(`[data-cy=${id}]`).should(`be.${state}`);
});

Then('I can see {string} text on {string} element', (text, id) => {
    cy.get(`[data-cy=${id}]`).contains(text).should('be.visible');
});

Then('I close modal', () => {
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modalClose]').click();
});

And('I click {string} check', (id) => {
    cy.get(`[data-cy=${id}]`).find('label').click();
});

And('I choose {string} option from {string} select', (optionNr, id) => {
    cy.get(`[data-cy=${id}]`).click().should('be.visible');
    cy.get('[data-cy=selectDropDown]')
        .should('be.visible')
        .find('ul > li').as('elementList');
    cy.get('@elementList').its('length').should('be.gt', 0);
    cy.get('@elementList').eq(optionNr).as('selectedOption');
    cy.get('@selectedOption').click();
    cy.get('@selectedOption').then(($option) => {
        const optionValue = $option.text().trim();

        cy.get(`[data-cy=${id}]`).find('[data-cy=selectValue] span').contains(optionValue);
    });
    cy.get('[data-cy=selectDropDown]').should('not.exist');
});

And('I choose {string} options from {string} multi select', (optionNrs, id) => {
    const parsedOptions = JSON.parse(optionNrs);

    cy.get(`[data-cy=${id}]`).click().should('be.visible');
    cy.get('[data-cy=selectDropDown]')
        .should('be.visible')
        .find('ul > li').as('elementList');
    cy.get('@elementList').its('length').should('be.gt', 0);
    cy.wrap(parsedOptions).each((optionNr) => {
        cy.get('@elementList').eq(optionNr).as('selectedOption');
        cy.get('@selectedOption').click();
        cy.get('@selectedOption').then(($option) => {
            const optionValue = $option.text().trim();

            cy.get(`[data-cy=${id}]`).find('[data-cy=selectValue] span').contains(optionValue);
        });
    });
    cy.get('[data-cy=selectDropDown]').find('button').contains('OK').click();
    cy.get('[data-cy=selectDropDown]').should('not.exist');
});
