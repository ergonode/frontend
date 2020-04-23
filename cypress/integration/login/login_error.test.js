/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
context('Login ', () => {
    beforeEach(() => {
        cy.visit('');
        cy.request('POST', 'login').as('postLogin');
        cy.get('[data-cy=loginButton]').as('loginButton');
    });

    describe('Login faild', () => {
        it('Without data', () => {
            cy.get('@loginButton').click();
            cy.wait('@postLogin').its('status').should('eq', 401);
        });

        it('Incorrect email', () => {
            cy.get('[data-cy=loginEmail]').find('input').type('test').should('have.value', 'test');
            cy.get('[data-cy=loginPass]').find('input').type('123').should('have.value', '123');
            cy.get('@loginButton').click();
            cy.wait('@postLogin').its('status').should('eq', 500);
        });
        it('Incorrect data', () => {
            cy.get('[data-cy=loginEmail]').find('input').type('test@test.pl').should('have.value', 'test@test.pl');
            cy.get('[data-cy=loginPass]').find('input').type('123').should('have.value', '123');
            cy.get('@loginButton').click();
            cy.wait('@postLogin').its('status').should('eq', 401);
        });
    });
});
