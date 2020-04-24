/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
Cypress.Commands.add('apiRequest', (type, url) => {
  cy.server();
  cy.route(type, `${Cypress.env('apiServer')}${url}`);
});

Cypress.Commands.add('login', (email, pass) => {
    cy.visit('');
    cy.apiRequest('POST', 'login').as('postLogin');
    cy.get('[data-cy=loginEmail]').find('input').type(email).should('have.value', email);
    cy.get('[data-cy=loginPass]').find('input').type(pass).should('have.value', pass);
    cy.get('[data-cy=loginButton]').click();
    cy.wait('@postLogin').its('status').should('eq', 200);
    cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('logout', () => {
    cy.wait(1000);
    cy.get('[data-cy=navBarDropDown]').click();
    cy.get('[data-cy=navBarContent]').should('be.visible');
    cy.get('[data-cy=logoutButton]').click();
    cy.url().should('include', '');
});

Cypress.Commands.add('selectRandomUser', () => {
    cy.get('.action-link').then((links) => {
        const { length } = links;
        links[length - 1].click();
    });
    cy.url().should('include', 'users/edit');
});

