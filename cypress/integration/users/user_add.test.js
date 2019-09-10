/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getUUID } from "../../../model/stringWrapper";

context('Add User', () => {
    const uuid = getUUID();

    before(() => {
        cy.login('admin');
        cy.visit('/users');
    });

    describe('Navigate to User creation page', () => {
        it('Visit /users/grid', () => {
            cy.get('.header-title__title').should('contain', 'Users');
            cy.url().should('include', '/users/grid');
        });

        it('Visit /users/new/general', () => {
            cy.get('button').contains('CREATE USER').click();
            cy.url().should('include', '/users/new/general');
        });
    });

    describe('Insert User values - invalid', () => {
        before(() => {
            cy.server();
            cy.route('POST', '/api/v1/EN/accounts').as('addUser');
        });

        it('Invalid User data', () => {
            cy.get('button').contains('CREATE USER').click();
            cy.wait('@addUser').its('status').should('eq', 400);
        });
    });

    describe('Insert User values - valid', () => {
        it('Insert email', () => {
            cy.get('input[aria-label="Email"]')
                .type(`${uuid}@gmail.com`)
                .should('have.value', `${uuid}@gmail.com`);
        });

        it('Insert first name', () => {
            cy.get('input[aria-label="First name"]')
                .type(`firstName${uuid}`)
                .should('have.value', `firstName${uuid}`);
        });

        it('Insert last name', () => {
            cy.get('input[aria-label="Last name"]')
                .type(`lastName${uuid}`)
                .should('have.value', `lastName${uuid}`);
        });

        it('Insert password', () => {
            cy.get('input[aria-label="Password"]')
                .type(`password${uuid}`)
                .should('have.value', `password${uuid}`);
        });

        it('Insert password repeat', () => {
            cy.get('input[aria-label="Password repeat"]')
                .type(`password${uuid}`)
                .should('have.value', `password${uuid}`);
        });

        it('Select language', () => {
            cy.get('label')
                .contains('Language')
                .click()
                .should('be.visible');
            cy.get('.list').contains('English').click();
            cy.get('input[aria-label="Language"]').should('have.value', 'English');
        });

        it('Select role', () => {
            cy.get('label')
                .contains('Role')
                .click()
                .should('be.visible');
            cy.get('.list').contains('Admin').click();
            cy.get('input[aria-label="Role"]').should('have.value', 'Admin');
        });

        it('Create User', () => {
            cy.server();
            cy.route('POST', '/api/v1/EN/accounts').as('addUser');
            cy.get('button').contains('CREATE USER').click();
            cy.wait('@addUser').its('status').should('eq', 201);
            cy.url().should('include', '/users/edit');
        });
    });
});
