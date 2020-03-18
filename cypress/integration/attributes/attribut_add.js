/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
/// <reference types="Cypress" />

context('Attribute add', () => {
    const timestamp = Date.now();

    before(() => {
        cy.login('admin');
        cy.visit('/attributes');
        cy.menu();
    });

    describe('Attributes init', () => {
        it('Can visit /attributes', () => {
            cy.get('.header-title__title').should('contain', 'Attributes');
            cy.url().should('include', '/attributes');
        });

        it('Visit /attributes/attribute/new', () => {
            cy.get('button').contains('NEW ATTRIBUTE').click({ force: true });
            cy.url().should('include', '/attributes/attribute/new/general');
        });
    });

    describe('Insert attribute values - invalid', () => {
      beforeEach(() => {
          cy.server();
          cy.route('POST', '/api/v1/EN/attributes').as('attrRoute');
      });
      it('Create attribute', () => {
          cy.wait(500);
          cy.get('button').contains('NEW ATTRIBUTE').click({ force: true });
          cy.wait('@attrRoute').its('status').should('eq', 400);
          cy.url().should('include', '/attributes/attribute/new');
      });
    });

    describe('Insets attribute values - valid', () => {

        it('Insert code', () => {
            cy.get('.base-card').find('label')
                .contains('Code')
                .nextAll('input')
                .type(`test${timestamp}`)
                .should('have.value', `test${timestamp}`);
        });

        it('Select group', () => {
            cy.get('.base-card').find('label')
                .contains('Group')
                .click({ force: true })
                .should('be.visible');
            cy.get('.list').contains('System').click({ force: true });
            cy.get('button').contains('OK').click({ force: true });
            cy.get('input[aria-label="Group"]').should('have.value', 'System');
        });

        it('Select type', () => {
            cy.get('.base-card').find('label')
                .contains('Type')
                .click({ force: true })
                .should('be.visible');
            cy.get('.list').contains('Text').click({ force: true });
            cy.get('input[aria-label="Type"]').should('have.value', 'Text');
        });

    });

    describe('Confirm attribute', () => {
        it('Create attribute', () => {
            cy.server();
            cy.route('POST', '/api/v1/EN/attributes').as('attrRoute');
            cy.get('button').contains('NEW ATTRIBUTE').click({ force: true });
            cy.wait('@attrRoute').its('status').should('eq', 201);
            cy.url().should('include', '/attributes/attribute/edit');
        });
        it('Check added attribute', () => {
            cy.get('input[aria-label="System name"]')
                .should('have.value', `test${timestamp}`)
                .should('be.disabled');
            cy.get('.toggler').should('have.class', 'toggler--disabled');
            cy.get('.header-title__title').should('contain', `test${timestamp}`);
        });
    });
});
