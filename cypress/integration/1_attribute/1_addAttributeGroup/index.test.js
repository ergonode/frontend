/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Then } from 'cypress-cucumber-preprocessor/steps';
import {
    sendRequest, getToken, checkGridRow, removeRequest,
} from '../../models/addingItems';

beforeEach(() => {
    cy.apiRequest('POST', 'en/attributes/groups').as('POST-REQUEST');
});

Then('I send a {string} request and status code should be {int}', (reqType, status) => {
    getToken();
    sendRequest({ reqType, status, urlRegExp: /\/en\/attributes\/groups$/ });
});

Then('On {string} I can see row {int} with columns data: {string}', (gridId, rowNr, columns) => {
    checkGridRow({ gridId, rowNr, columns });
});

Then('I remove {string} element by {string} request', (element, reqType) => {
    removeRequest({ element, reqType, path: 'en/attributes/groups' });
});
