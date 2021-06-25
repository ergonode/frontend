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
    MultiSteps,
} from '../../../../models/index';

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
            method: 'POST',
            url,
        },
    ).as(`${requestName}_POST`);
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
    cy.openPage({
        page,
        requestAlias: `@${requestName}_GET`,
    });
    cy.checkRequest({
        requestAlias: `@${requestWorkflowName}_GET`,
        statusCode: 200,
    });
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} in row {int} I create transition from {string} to {string}', (gridId, rowId, from, to) => {
    const statuses = [];
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');

    cy
        .get('@grid')
        .find('.workflow-designer-header-layer-cell__title span')
        .each(($el) => {
            statuses.push($el.text().trim());
        }).then(() => {
            const fromIndex = statuses.findIndex(status => status === from);
            const toIndex = statuses.findIndex(status => status === to);

            cy
                .get('@grid')
                .find('.workflow-designer-background-item')
                .get(`[row=${rowId - 1}][column=${fromIndex}]`)
                .realHover()
                .realClick();
            cy
                .get('@grid')
                .find('.workflow-designer-background-item')
                .get(`[row=${rowId - 1}][column=${toIndex}]`)
                .realHover()
                .realClick();
        });
});
