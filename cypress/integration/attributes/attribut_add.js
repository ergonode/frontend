/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
/// <reference types="Cypress" />

context('Attribute add ', () => {
    beforeEach(() => {
        cy.visit('');
    });

    it('Login error - without data', () => {
        cy.server();
        cy.route('POST', '/api/v1/login').as('login');
        cy.get('.btn').click();
        cy.get('.alert.alert--error').should('contain', 'Internal Server Error');
        cy.wait('@login').its('status').should('eq', 500);
    });
});
