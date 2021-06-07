/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    And,
    Given,
    Then,
    When,
} from 'cypress-cucumber-preprocessor/steps';

import {
    escapeStringRegexp,
    MultiSteps,
} from '../../../../models/index';
import {
    openPage,
    sendRequest,
} from '../../../../models/navigation';

const requestName = 'transitionRequest';
const requestWorkflowName = 'workflowRequest';
const url = /workflow\/default/;
const workflowUrl = /workflow\/default\/transitions/;

before(() => {
    cy.getCookie('token')
        .then((token) => {
            if (!token) {
                cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
            }
        });
});

beforeEach(() => {
    cy.intercept(
        {
            method: 'DELETE',
            url,
        },
    ).as(`${requestName}_DELETE`);
    cy.intercept(
        {
            method: 'GET',
            url,
        },
    ).as(`${requestName}_GET`);
    cy.intercept(
        {
            method: 'GET',
            url: workflowUrl,
        },
    ).as(`${requestWorkflowName}_GET`);
});

MultiSteps([
    Given,
    And,
], 'I open {string} page', (page) => {
    openPage({
        page,
        requestName,
    });
    cy
        .wait(`@${requestWorkflowName}_GET`)
        .its('response.statusCode')
        .should('eq', 200);
});

MultiSteps([
    Then,
    And,
], 'I send a {string} request and status code should be {int}', (reqType, status) => {
    sendRequest({
        requestName,
        reqType,
        status,
    });
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
        .find('.workflow-designer-header-layer-cell')
        .find('.workflow-designer-header-layer-cell__title span')
        .contains(new RegExp(`${escapeStringRegexp(searchValue)}$`, 'g'));
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} in row {int} I can see the transition from {string} to {string}', (gridId, rowId, from, to) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .get(`[data-cy="layout-element-row:${rowId}-from:${from}-to:${to}"]`);
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} in row {int}, I click on the {string} button for the transition from {string} to {string}', (gridId, rowId, action, from, to) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .get(`[data-cy="layout-element-row:${rowId}-from:${from}-to:${to}"]`)
        .find(`[data-cy="transition-action-${action}"]`)
        .click();
});
