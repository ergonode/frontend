/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

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

Then('I send a {string} request to {string} and the response status code should be {string}', (reqType, reqUrl, status) => {
    cy.apiRequest(reqType, reqUrl).as('req');
    cy.wait('@req').its('status').should('eq', status);
});
