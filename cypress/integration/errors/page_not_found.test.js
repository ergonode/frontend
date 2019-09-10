/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
context('Page not found', () => {
    before(() => {
        cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
        cy.visit('/users');
    });

    describe('Enter to invlide page URL', () => {
        it('Invalid URL', () => {
            cy.visit('page/not/found', { failOnStatusCode: false });
            cy.get('h1').invoke('text').should('include', 'Not found');
        });
    });
});
