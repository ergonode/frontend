/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Then, And } from 'cypress-cucumber-preprocessor/steps';
import {
    sendPostRequest,
    getToken,
    checkGridRow,
    removeRequest,
    removeOnGrid,
    noGridRow,
} from '../../models/addingItems';

beforeEach(() => {
    cy.apiRequest('POST', 'en/attributes').as('POST-REQUEST');
});

Then('I send a {string} request and status code should be {int}', (reqType, status) => {
    getToken();
    sendPostRequest({ reqType, status, urlRegExp: /\/en\/attributes$/ });
});

Then('On {string} I can see row {int} with columns data: {string}', (gridId, rowNr, columns) => {
    checkGridRow({ gridId, rowNr, columns });
});

And('On {string} I can not see row {int} with columns data: {string}', (gridId, rowNr, columns) => {
    noGridRow({ gridId, rowNr, columns });
});

Then('I remove {string} element by {string} request', (element, reqType) => {
    removeRequest({ element, reqType, path: 'en/attributes' });
});

And('On {string} I click on {string} button for row {int}', (gridId, action, rowNr) => {
    removeOnGrid({ gridId, action, rowNr });
});
