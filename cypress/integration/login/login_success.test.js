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
    });
    it('Login success', () => {
        cy.server();
        cy.route('POST', '/api/v1/login').as('login');
        cy.get(':nth-child(1) > .input__content > input').type('superadmin@ergonode.com').should('have.value', 'superadmin@ergonode.com');
        cy.get(':nth-child(2) > .input__content > input').type('123').should('have.value', '123');
        cy.wait(1000);
        cy.get('.btn').click();
        cy.wait('@login').its('status').should('eq', 200);
        cy.url().should('eq', `${URL}/dashboard`);
    });
});
