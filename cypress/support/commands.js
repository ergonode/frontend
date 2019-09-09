/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

Cypress.Commands.add('login', (userType) => {
    const email = Cypress.env(`${userType}Email`);
    const pass = Cypress.env(`${userType}Pass`);
    cy.visit('');
    cy.server();
    cy.route('POST', '/api/v1/login').as('postLogin');
    cy.get('input[aria-label="Username"]').type(email).should('have.value', email);
    cy.get('input[aria-label="Password"]').type(pass).should('have.value', pass);
    cy.get('button').contains('span', 'Log in').click();
    cy.wait('@postLogin').its('status').should('eq', 200);
    cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('menu', () => {
    cy.get('nav.navigation-bar').should('be.ok');
    cy.get('.left > :nth-child(1)').should('be.ok');
    cy.get('.left > :nth-child(1) > svg').click();
    cy.get('.left > :nth-child(1) > svg').click();
    cy.get('.side-bar-wrapper').should('have.attr', 'class', 'side-bar-wrapper menu--hidden');
});
