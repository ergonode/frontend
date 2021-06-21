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

const requestName = 'statusRequest';
const requestWorkflowName = 'workflowRequest';
const url = /status/;
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
            method: 'PUT',
            url,
        },
    ).as(`${requestName}_PUT`);
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
], 'On {string} I click on {string} button for column with {string} value', (gridId, action, searchValue) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find('.workflow-designer-header-layer-cell')
        .find('.workflow-designer-header-layer-cell__title span')
        .contains(new RegExp(`${escapeStringRegexp(searchValue)}$`, 'g'))
        .parents('.workflow-designer-header-layer-cell')
        .find(`[data-cy=status-column-${action}]`)
        .click();
});
