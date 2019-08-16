/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
/// <reference types="Cypress" />

context('Login ', () => {
    beforeEach(() => {
        cy.visit('');
        cy.server();
        cy.route('POST', '/api/v1/login').as('loginRoute');
        cy.get('div.btn').contains('span', 'Log in').as('loginBtn');
    });
    it('Login success', () => {
        const email = Cypress.env('adminEmail');
        const pass = Cypress.env('adminPass');
        cy.get(':nth-child(1) > .input__content > input').type(email).should('have.value', email);
        cy.get(':nth-child(2) > .input__content > input').type(pass).should('have.value', pass);
        cy.get('@loginBtn').click({ force: true });
        cy.wait('@loginRoute').its('status').should('eq', 200);
        cy.url().should('include', '/dashboard');
    });
});
