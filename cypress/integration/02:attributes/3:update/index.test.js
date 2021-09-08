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
} from '../../../models/index';
import {
    openPage,
    sendRequest,
} from '../../../models/navigation';

const requestName = 'attributeRequest';
const requestOptionName = 'attributeOptionRequest';
const url = /^(?!.*options)(?=.*attributes).*/;
const urlOpt = /attributes\/(.*?)\/options\/(.*?)/;

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
            method: 'PUT',
            url: urlOpt,
        },
    ).as(`${requestOptionName}_PUT`);
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
    Then,
    And,
], 'I send a {string} option request and status code should be {int}', (reqType, status) => {
    cy
        .wait(`@${requestOptionName}_${reqType}`)
        .then((xhr) => {
            expect(xhr.request.method).to.equal(reqType);
            expect(xhr.response.statusCode).to.equal(status);
        });
});
