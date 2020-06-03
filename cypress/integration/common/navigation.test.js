/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Given, Then, When, And,
} from 'cypress-cucumber-preprocessor/steps';
import { MultiSteps } from '../models';

MultiSteps([Given, And], 'I open {string} page', (page) => {
    cy.visit(`/${page}`);
    cy.url().should('include', `/${page}`);
});

MultiSteps([When, Then, And], 'I click on {string} button', (id) => {
    cy.get(`[data-cy=${id}]`).click();
});

MultiSteps([When, And], 'On {string} element I click button with {string} text', (id, text) => {
    cy.get(`[data-cy=${id}]`).find('button').contains(text).click();
});

MultiSteps([When, Then], 'I fill the {string} input with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`).find('input').type(term).should('have.value', term);
});

MultiSteps([Then, And], 'I fill the {string} input with the {string} term for {string} translation', (id, term, language) => {
    const name = `${id}_${language}`.toLowerCase();

    cy.get(`[data-cy=${name}]`).find('input').type(term).should('have.value', term);
});

MultiSteps([Then, And], 'I fill the {string} textarea with the {string} term for {string} translation', (id, term, language) => {
    const name = `${id}_${language}`.toLowerCase();

    cy.get(`[data-cy=${name}]`).find('textarea').type(term).should('have.value', term);
});

MultiSteps([Then, And], 'I fill the {string} input for index {int} with the {string} term for {string} translation', (id, index, term, language) => {
    const name = `${id}_${language}_${index}`.toLowerCase();

    cy.get(`[data-cy=${name}]`).find('input').type(term).should('have.value', term);
});

MultiSteps([Then, When], 'I click tab with {string} text', (text) => {
    cy.get('[data-cy=tab-bar__items]').contains(text).click();
});

MultiSteps([Then, And], 'Element {string} is {string}', (id, state) => {
    cy.get(`[data-cy=${id}]`).should(`be.${state}`);
});

MultiSteps([Then, And], 'I can see {string} text on {string} element', (text, id) => {
    cy.get(`[data-cy=${id}]`).contains(text);
});

MultiSteps([Then, And], 'I close modal', () => {
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal-close]').click();
});

MultiSteps([Then, And], 'I close modal by button', () => {
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal-cancel]').click();
});

MultiSteps([Then, And], 'I confirm modal', () => {
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal-confirm]').click();
});

MultiSteps([Then, And], 'I see {string} page', (page) => {
    const url = page.replace(/%\w+%/g, '(.*?)');

    cy.url().should('match', new RegExp(url));
});

MultiSteps([Then, And], 'I click {string} check', (id) => {
    cy.get(`[data-cy=${id}]`).find('label').click();
});

MultiSteps([And, Then], 'I choose {int} option from {string} select field', (optionNr, id) => {
    cy.get(`[data-cy=${id}]`).click();
    cy.get(`[data-cy=${id}-drop-down]`)
        .should('be.visible')
        .find('.list > .element').as('elementList');
    cy.get('@elementList').its('length').should('be.gt', 0);
    cy.get('@elementList').eq(optionNr).as('selectedOption');
    cy.get('@selectedOption').click({ force: true });
    cy.get('@selectedOption').then(($option) => {
        const optionValue = new RegExp($option.text().trim().replace('#', ''));

        cy.get(`[data-cy=${id}-value] span`).contains(optionValue);
    });
    cy.get(`[data-cy=${id}-drop-down]`).should('be.not.visible');
});

MultiSteps([And, Then], 'I choose {string} options from {string} multi select field', (optionNrs, id) => {
    const parsedOptions = JSON.parse(optionNrs);

    cy.get(`[data-cy=${id}]`).click().should('be.visible');
    cy.get(`[data-cy=${id}-drop-down]`)
        .should('be.visible')
        .find('.list > .element').as('elementList');
    cy.get('@elementList').its('length').should('be.gt', 0);
    cy.wrap(parsedOptions).each((optionNr) => {
        cy.get('@elementList').eq(optionNr).as('selectedOption');
        cy.get('@selectedOption').click();
        cy.get('@selectedOption').then(($option) => {
            const optionValue = new RegExp($option.text().trim().replace('#', ''));

            cy.get(`[data-cy=${id}-value] span`).contains(optionValue);
        });
    });
    cy.get(`[data-cy=${id}-drop-down]`).find('button').contains('OK').click();
    cy.get(`[data-cy=${id}-drop-down]`).should('be.not.visible');
});
