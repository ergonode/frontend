/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getUUID } from '../../../model/stringWrapper';

context('Change User data', () => {
    const uuid = getUUID();

    before(() => {
        cy.login('admin');
        cy.visit('/users');
    });

    describe('Navigate to User edition page', () => {
        it('Select random User by clicking edit in users grid', () => {
            cy.selectRandomUser();
        });
    });

    describe('Change User values - valid', () => {
        it('Insert first name', () => {
            cy.get('input[aria-label="First name"]')
                .clear()
                .type(`firstName${uuid}`)
                .should('have.value', `firstName${uuid}`);
        });

        it('Insert last name', () => {
            cy.get('input[aria-label="Last name"]')
                .clear()
                .type(`lastName${uuid}`)
                .should('have.value', `lastName${uuid}`);
        });

        it('Select language', () => {
            cy.get('input[aria-label="Language"]')
                .click({ force: true })
                .should('be.visible');
            cy.get('.list').contains('Polish').click();
            cy.get('input[aria-label="Language"]').should('have.value', 'Polish');
        });

        it('Select role', () => {
            cy.get('input[aria-label="Role"]')
                .click({ force: true })
                .should('be.visible');
            cy.get('.list').contains('Data inputer').click();
            cy.get('input[aria-label="Role"]').should('have.value', 'Data inputer');
        });

        it('Update User', () => {
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
