/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    And,
    Given,
    Then,
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
    cy.openPage({
        page,
        requestAliases: [
            `@${requestName}_GET`,
            `@${requestWorkflowName}_GET`,
        ],
    });
});

MultiSteps([
    Then,
    And,
], 'I send a {string} request and status code should be {int}', (reqType, status) => {
    cy.sendRequest({
        requestName,
        reqType,
        status,
    });
});
