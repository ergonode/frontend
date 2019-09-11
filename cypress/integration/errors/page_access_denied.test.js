/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getUUID } from '../../../model/stringWrapper';

context('Page access denied', () => {
    const uuid = getUUID();
    const dataInputerEmail = `${uuid}@gmail.com`;
    const dataInputerPassword = `password${uuid}`;

    before(() => {
        cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
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

    describe('Add User', () => {
        it('Insert email', () => {
            cy.get('input[aria-label="Email"]')
                .type(dataInputerEmail)
                .should('have.value', dataInputerEmail);
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
                .type(dataInputerPassword)
                .should('have.value', dataInputerPassword);
        });

        it('Insert password repeat', () => {
            cy.get('input[aria-label="Password repeat"]')
                .type(dataInputerPassword)
                .should('have.value', dataInputerPassword);
        });

        it('Select language', () => {
            cy.get('label')
                .contains('Language')
                .click()
                .should('be.visible');
            cy.get('.list').contains('English').click();
            cy.get('input[aria-label="Language"]').should('have.value', 'English');
        });

        it('Select activity status', () => {
            cy.get('input[aria-label="Activity status"]')
                .click({ force: true })
                .should('be.visible');
            cy.get('.list').contains('Active').click();
            cy.get('input[aria-label="Activity status"]').should('have.value', 'Active');
        });

        it('Select role', () => {
            cy.get('label')
                .contains('Role')
                .click()
                .should('be.visible');
            cy.get('.list').contains('Data inputer').click();
            cy.get('input[aria-label="Role"]').should('have.value', 'Data inputer');
        });

        it('Create User', () => {
            cy.server();
            cy.route('POST', '/api/v1/EN/accounts').as('addUser');
            cy.get('button').contains('CREATE USER').click();
            cy.wait('@addUser').its('status').should('eq', 201);
            cy.url().should('include', '/users/edit');
        });
    });

    describe('Logout from application', () => {
        it('Logout', () => {
            cy.logout();
        });
    });

    describe('Login to Data inputer and navigate to denied link', () => {
        it('Login', () => {
            cy.login(dataInputerEmail, dataInputerPassword);
            cy.visit('/workflow', { failOnStatusCode: false });
            cy.get('h1').invoke('text').should('include', 'Access denied');
        });
    });
});
