/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
/// <reference types="Cypress" />
const URL = 'http://localhost:3000';

context('Login ', () => {
    beforeEach(() => {
        cy.visit(URL);
    });

    it('Login error - without data', () => {
        cy.server();
        cy.route('POST', '/api/v1/login').as('login');
        cy.get('.btn').click();
        cy.get('.alert.alert--error').should('contain', 'Internal Server Error');
        cy.wait('@login').its('status').should('eq', 500);
    });

    it('Login error - incorrect data', () => {
        cy.server();
        cy.route('POST', '/api/v1/login').as('login');
        cy.get(':nth-child(1) > .input__content > input').type('test').should('have.value', 'test');
        cy.get(':nth-child(2) > .input__content > input').type('123').should('have.value', '123');
        cy.get('.btn').click();
        cy.wait('@login').its('status').should('eq', 500);
        cy.get('.alert.alert--error').should('contain', 'Internal Server Error');
    });
});
