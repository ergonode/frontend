/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Given,
} from 'cypress-cucumber-preprocessor/steps';

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
