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
    requestTypes,
    statusCodes,
} from '../../defaults';
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
], 'On {string} I {string} the data and {string} is {string}', (container, button, action, status) => {
    const requestType = requestTypes[action];

    if (statusCodes[requestType][status] && requestType) {
        cy.getBySel(container)
            .find(`[data-cy=${button}]`)
            .click();
        cy.sendRequest({
            requestName: Cypress.spec.name,
            requestType,
            status: statusCodes[requestType][status],
        });
    }
});

MultiSteps([
    When,
    Then,
    And,
], 'I {string} the data and {string} is {string}', (button, action, status) => {
    const requestType = requestTypes[action];

    if (statusCodes[requestType][status] && requestType) {
        cy.getBySel(button)
            .click();
        cy.sendRequest({
            requestName: Cypress.spec.name,
            requestType,
            status: statusCodes[requestType][status],
        });
    }
});

MultiSteps([
    When,
    Then,
    And,
], 'I click back arrow', () => {
    cy.getBySel('navigate-back-fab').click();
});

MultiSteps([
    When,
    Then,
    And,
], 'I click on {string} button', (id) => {
    cy.getBySel(id)
        .click({
            force: true,
        });
});

MultiSteps([
    When,
    Then,
    And,
], 'On {string} element I click {string} button', (parent, id) => {
    cy.getBySel(parent)
        .find(`[data-cy=${id}]`)
        .click();
});

MultiSteps([
    When,
    And,
], 'On {string} element I click button with {string} text', (id, text) => {
    cy.getBySel(id)
        .find('button')
        .contains(text)
        .click();
});

MultiSteps([
    Then,
    When,
], 'I click tab with {string} text', (text) => {
    cy.getBySel('tab-bar__items')
        .contains(text)
        .click();
});

MultiSteps([
    Then,
    When,
], 'I set {string} view on the grid', (view) => {
    cy.getBySel(`grid-${view}-view`)
        .click();
});

MultiSteps([
    Then,
    And,
], 'I close modal', () => {
    cy.getBySel('modal-close')
        .should('be.visible')
        .click();
});

MultiSteps([
    Then,
    And,
], 'I close modal by button', () => {
    cy.getBySel('modal-cancel')
        .should('be.visible')
        .click();
});

MultiSteps([
    Then,
    And,
], 'I close modal by clicking on the overlay', () => {
    cy.getBySel('modal')
        .should('be.visible')
        .find('[data-cy=modal-overlay]')
        .click();
});

MultiSteps([
    Then,
    And,
], 'I confirm modal', () => {
    cy.getBySel('modal')
        .should('be.visible')
        .find('[data-cy=modal-confirm]')
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
        .getBySel(gridId)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find('.workflow-designer-header-layer-cell__title')
        .contains(new RegExp(`${escapeStringRegexp(searchValue)}$`, 'g'))
        .parents('.workflow-designer-header-layer-cell')
        .find(`[data-cy=status-column-${action}]`)
        .click({
            force: true,
        });
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} I can see column with {string} value', (gridId, searchValue) => {
    cy
        .getBySel(gridId)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find('.workflow-designer-header-layer-cell__title')
        .contains(new RegExp(`${escapeStringRegexp(searchValue)}$`, 'g'));
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} I can see the transition from {string} to {string}', (gridId, from, to) => {
    cy
        .getBySel(gridId)
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
        .getBySel(gridId)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find(`[data-cy="layout-element-row:from:${from}-to:${to}"]`)
        .find(`[data-cy="transition-action-${action}"]`)
        .click();
});
