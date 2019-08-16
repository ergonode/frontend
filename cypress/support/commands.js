/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

Cypress.Commands.add('login', (userType) => {
    const email = Cypress.env(`${userType}Email`);
    const pass = Cypress.env(`${userType}Pass`);
    cy.visit('');
    cy.server();
    cy.route('POST', '/api/v1/login').as('loginRoute');

    cy.get(':nth-child(1) > .input__content > input').type(email).should('have.value', email);
    cy.get(':nth-child(2) > .input__content > input').type(pass).should('have.value', pass);
    cy.get('div.btn').contains('span', 'Log in').click({ force: true });
    cy.wait('@loginRoute').its('status').should('eq', 200);
    cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('menu', () => {
    cy.get('nav.navigation-bar').should('be.ok');
    cy.get('.left > :nth-child(1)').should('be.ok');
    cy.get('.left > :nth-child(1) > svg').click({ force: true });
    cy.get('.left > :nth-child(1) > svg').click({ force: true });
    cy.get('.side-bar-wrapper').should('have.attr', 'class', 'side-bar-wrapper menu--hidden');
});
