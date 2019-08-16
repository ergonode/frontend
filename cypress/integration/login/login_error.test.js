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

    describe('Login faild', () => {
        it('Without data', () => {
            cy.get('@loginBtn').click({ force: true });
            cy.get('.alert.alert--error').should('contain', 'Internal Server Error');
            cy.wait('@loginRoute').its('status').should('eq', 500);
        });

        it('Incorrect data', () => {
            cy.get(':nth-child(1) > .input__content > input').type('test').should('have.value', 'test');
            cy.get(':nth-child(2) > .input__content > input').type('123').should('have.value', '123');
            cy.get('@loginBtn').click({ force: true });
            cy.wait('@loginRoute').its('status').should('eq', 500);
            cy.get('.alert.alert--error').should('contain', 'Internal Server Error');
        });
    });
});
