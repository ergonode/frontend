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
} from '../../../models/index';
import {
    actionOnGrid,
    checkGridRow,
    openPage,
    sendRequest,
} from '../../../models/navigation';

const requestName = 'accountsRequest';
const url = /accounts/;

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    cy.intercept(
        {
            method: 'GET',
            url,
        },
    ).as(`${requestName}_GET`);
});

MultiSteps([
    Given,
    And,
], 'I open {string} page', (page) => {
    openPage({
        page,
        requestName,
    });
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
], 'On {string} I can see row with {string} value and columns data: {string}', (gridId, searchValue, columns) => {
    checkGridRow({
        gridId,
        searchValue,
        columns,
        showMoreRows: false,
    });
});

MultiSteps([
    And,
    Then,
], 'On {string} I click on {string} button for row with {string} value', (gridId, action, searchValue) => {
    actionOnGrid({
        gridId,
        action,
        searchValue,
        showMoreRows: false,
    });
});
