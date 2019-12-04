/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getUUID } from "../../../model/stringWrapper";

context('Add Attribute', () => {
    const uuid = getUUID();

    before(() => {
        cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
        cy.visit('/attributes');
        cy.menu();
    });

    describe('Navigate to Attribute creation page', () => {
        it('Visit /attributes/grid', () => {
            cy.get('.header-title__title').should('contain', 'Attributes');
            cy.url().should('include', '/attributes');
        });

        it('Visit /attributes/attribute/new/general', () => {
            cy.get('button').contains('NEW ATTRIBUTE').click();
            cy.url().should('include', '/attributes/attribute/new/general');
        });
    });

    describe('Insert Attribute values - invalid', () => {
      before(() => {
          cy.server();
          cy.route('POST', '/api/v1/EN/attributes').as('addAttribute');
      });

      it('Create Attribute', () => {
          cy.get('button').contains('NEW ATTRIBUTE').click();
          cy.wait('@addAttribute').its('status').should('eq', 400);
          cy.url().should('include', '/attributes/attribute/new');
      });
    });

    describe('Insert Attribute values - valid', () => {
        it('Insert code', () => {
            cy.get('input[aria-label="Code"]')
                .type(uuid)
                .should('have.value', uuid);
        });

        it('Select group', () => {
            cy.get('label')
                .contains('Group')
                .click()
                .should('be.visible');
            cy.get('.list').contains('System').click();
            cy.get('button').contains('OK').click();
            cy.get('input[aria-label="Group"]').should('have.value', 'System');
        });

        it('Select type', () => {
            cy.get('label')
                .contains('Type')
                .click()
                .should('be.visible');
            cy.get('.list').contains('Text').click();
            cy.get('input[aria-label="Type"]').should('have.value', 'Text');
        });

        it('Create Attribute', () => {
            cy.server();
            cy.route('POST', '/api/v1/EN/attributes').as('addAttribute');
            cy.get('button').contains('NEW ATTRIBUTE').click();
            cy.wait('@addAttribute').its('status').should('eq', 201);
            cy.url().should('include', '/attributes/attribute/edit');
        });
    });
});
