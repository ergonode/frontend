/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
/// <reference types="Cypress" />

context('Reusable "login" custom command', () => {
    before(() => {
        cy.login('admin');
        cy.visit('/attributes');
        cy.menu();
    });

    describe('Attributes init', () => {
        it('Can visit /attributes', () => {
            cy.get('.typo-title').should('contain', 'Attributes');
        });
    });

    describe('Insets attribute values', () => {
        it('Visit /attributes/new', () => {
            cy.get('.header-buttons-wrapper > .btn').contains('span', 'CREATE ATTRIBUTE').click({ force: true });
            cy.url().should('include', '/attributes/new/general');
        });

        it('Insert code', () => {
            cy.get('.base-card').find('label')
                .contains('Code')
                .nextAll('input')
                .type('test1')
                .should('have.value', 'test1');
        });
        it('Select group', () => {
            cy.get('.base-card').find('label').contains('Group').click({ force: true });
            cy.get('.list').contains('System').click({ force: true });
            cy.get('.horizontal-wrapper').contains('OK').click({ force: true });
        });

        it('Select type', () => {
            cy.get('.base-card').find('label').contains('Type').click({ force: true });
            cy.get('.list').contains('Text').click({ force: true });
        });
    });
    describe('Confirm attribute', () => {
        it('Create attribute', () => {
            cy.server();
            cy.route('POST', '/api/v1/EN/attributes').as('attrRoute');
            cy.get('.btn').contains('CREATE ATTRIBUTE').click({ force: true });
            cy.wait('@attrRoute').its('status').should('eq', 201);
            cy.url().should('include', '/attributes/edit');
        });
    });
});
