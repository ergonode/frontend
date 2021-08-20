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

const requestWorkflowName = 'workflowRequest';
const url = /workflow\/default/;
const workflowUrl = /workflow\/default\/transitions/;

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    cy.intercept(
        {
            method: 'GET',
            url,
        },
    ).as(`${Cypress.spec.name}_GET`);
    cy.intercept(
        {
            method: 'GET',
            url: workflowUrl,
        },
    ).as(`${requestWorkflowName}_GET`);
});

Given('I open {string} page', (page) => {
    cy.openPage({
        page,
        requestAliases: [
            `@${Cypress.spec.name}_GET`,
            `@${requestWorkflowName}_GET`,
        ],
    });
});

MultiSteps([
    And,
    Then,
    When,
], 'On {string} in row {int} I create transition from {string} to {string}', (gridId, rowId, from, to) => {
    const statuses = [];
    cy
        .getBySel(gridId)
        .should('be.visible')
        .as('grid');

    cy
        .get('@grid')
        .find('.workflow-designer-header-layer-cell__title')
        .each(($el) => {
            statuses.push($el.text().trim());
        }).then(() => {
            const fromIndex = statuses.findIndex(status => status === from);
            const toIndex = statuses.findIndex(status => status === to);

            cy
                .get('@grid')
                .find('.workflow-designer-background-item')
                .as('gridItem');

            cy.get('@gridItem')
                .get(`[row=${rowId - 1}][column=${fromIndex}]`)
                .realHover()
                .realClick()
                .get(`[row=${rowId - 1}][column=${toIndex}]`)
                .realHover()
                .realClick();
        });
});
