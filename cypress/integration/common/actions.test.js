/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    And,
    Then,
    When,
} from 'cypress-cucumber-preprocessor/steps';

import {
    escapeStringRegexp,
    MultiSteps,
} from '../../models';
import {
    actionOnGrid,
    noActionOnGrid,
} from '../../models/navigation';

MultiSteps([
    When,
    Then,
    And,
], 'I click back arrow', () => {
    cy.get('[data-cy=title-bar-header]')
        .find('button.fab')
        .click();
});

MultiSteps([
    When,
    Then,
    And,
], 'I click on {string} button', (id) => {
    cy.get(`[data-cy=${id}]`)
        .click({
            force: true,
        });
});

MultiSteps([
    When,
    Then,
    And,
], 'I click on {string} button in {string}', (id, container) => {
    cy.get(`[data-cy=${container}]`)
        .find(`[data-cy=${id}]`)
        .click();
});

MultiSteps([
    When,
    Then,
    And,
], 'I click on {string} button in {string}', (id, container) => {
    cy.get(`[data-cy=${container}]`)
        .find(`[data-cy=${id}]`)
        .click();
});

MultiSteps([
    When,
    Then,
    And,
], 'I click on {string} button in {string}', (id, container) => {
    cy.get(`[data-cy=${container}]`)
        .find(`[data-cy=${id}]`)
        .click();
});

MultiSteps([
    When,
    Then,
    And,
], 'I click on {string} button in {string}', (id, container) => {
    cy.get(`[data-cy=${container}]`)
        .find(`[data-cy=${id}]`)
        .click();
});

MultiSteps([
    When,
    Then,
    And,
], 'On {string} element I click {string} button', (parent, id) => {
    cy.get(`[data-cy=${parent}]`)
        .find(`[data-cy=${id}]`)
        .click({
            multiple: true,
        });
});

MultiSteps([
    When,
    And,
], 'On {string} element I click button with {string} text', (id, text) => {
    cy.get(`[data-cy=${id}]`)
        .find('button')
        .contains(text)
        .click();
});

MultiSteps([
    Then,
    When,
], 'I click tab with {string} text', (text) => {
    cy.get('[data-cy=tab-bar__items]')
        .contains(text)
        .click();
});

MultiSteps([
    Then,
    When,
], 'I set {string} view on the grid', (view) => {
    cy.get(`[data-cy=grid-${view}-view]`)
        .click();
});

MultiSteps([
    Then,
    And,
], 'I close modal', () => {
    cy.get('[data-cy=modal]')
        .should('be.visible');
    cy.get('[data-cy=modal-close]')
        .click();
});

MultiSteps([
    Then,
    And,
], 'I close modal by button', () => {
    cy.get('[data-cy=modal]')
        .should('be.visible');
    cy.get('[data-cy=modal-cancel]')
        .click();
});

MultiSteps([
    Then,
    And,
], 'I close modal by clicking on the overlay', () => {
    cy.get('[data-cy=modal]')
        .should('be.visible');
    cy.get('[data-cy=modal-overlay]')
        .click();
});

MultiSteps([
    Then,
    And,
], 'I confirm modal', () => {
    cy.get('[data-cy=modal]')
        .should('be.visible');
    cy.get('[data-cy=modal-confirm]')
        .click();
});

MultiSteps([
    And,
    Then,
], 'On {string} I click on {string} button for row with {string} value', (gridId, action, searchValue) => {
    actionOnGrid({
        gridId,
        action,
        searchValue,
    });
});

MultiSteps([
    And,
    Then,
], 'On {string} for a row with value {string}, there is no {string} button', (gridId, searchValue, action) => {
    noActionOnGrid({
        gridId,
        action,
        searchValue,
    });
});

// WORKFLOW ACTIONS
MultiSteps([
    And,
    Then,
    When,
], 'On {string} I click on {string} button for column with {string} value', (gridId, action, searchValue) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find('.workflow-designer-header-layer-cell__title span')
        .contains(new RegExp(`${escapeStringRegexp(searchValue)}$`, 'g'))
        .parents('.workflow-designer-header-layer-cell')
        .find(`[data-cy=status-column-${action}]`)
        .click();
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} I can see column with {string} value', (gridId, searchValue) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find('.workflow-designer-header-layer-cell__title span')
        .contains(new RegExp(`${escapeStringRegexp(searchValue)}$`, 'g'));
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} I can see the transition from {string} to {string}', (gridId, from, to) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find(`[data-cy="layout-element-row:from:${from}-to:${to}"]`);
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} I click on the {string} button for the transition from {string} to {string}', (gridId, action, from, to) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find(`[data-cy="layout-element-row:from:${from}-to:${to}"]`)
        .find(`[data-cy="transition-action-${action}"]`)
        .click();
});
