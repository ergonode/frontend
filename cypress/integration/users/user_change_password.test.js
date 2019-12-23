/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
context('Change User password', () => {
    before(() => {
        cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
        cy.visit('/users');
    });

    describe('Navigate to User edition page', () => {
        it('Select random User by clicking edit in users grid', () => {
            cy.selectRandomUser();
        });
    });

    describe('Invalid new password', () => {
        it('Password is incorrect', () => {
            cy.get('input[aria-label="Password"]')
                .type('123')
                .should('have.value', '123');
            cy.url().then(url => {
                const urlElements = url.split('/');
                const { length } = urlElements;
                const userId = urlElements[length - 2];

                cy.server();
                cy.route('PUT', `/api/v1/EN/accounts/${userId}`).as('updateUser');
                cy.get('button').contains('SAVE USER').click();
                cy.wait('@updateUser').its('status').should('eq', 400);
            });
        });
    });

    describe('Valid new password', () => {
        it('Password is correct', () => {
            cy.get('input[aria-label="Password"]')
                .clear()
                .type('Qwerty123!')
                .should('have.value', 'Qwerty123!');
            cy.get('input[aria-label="Password repeat"]')
                .type('Qwerty123!')
                .should('have.value', 'Qwerty123!');

            cy.url().then((url) => {
                const urlElements = url.split('/');
                const { length } = urlElements;
                const userId = urlElements[length - 2];

                cy.server();
                cy.route('PUT', `/api/v1/EN/accounts/${userId}`).as('updateUser');
                cy.get('button').contains('SAVE USER').click();
                cy.wait('@updateUser').its('status').should('eq', 204);
            });
        });
    });
});
