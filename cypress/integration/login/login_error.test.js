/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
context('Login ', () => {
    beforeEach(() => {
        cy.visit('');
        cy.server();
        cy.route('POST', '/api/v1/login').as('postLogin');
        cy.get('button').contains('span', 'Log in').as('loginButton');
    });

    describe('Login faild', () => {
        it('Without data', () => {
            cy.get('@loginButton').click();
            cy.wait('@postLogin').its('status').should('eq', 401);
        });

        it('Incorrect data', () => {
            cy.get('input[aria-label="Username"]').type('test').should('have.value', 'test');
            cy.get('input[aria-label="Password"]').type('123').should('have.value', '123');
            cy.get('@loginButton').click();
            cy.wait('@postLogin').its('status').should('eq', 401);
        });
    });
});
