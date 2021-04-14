/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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

const requestName = 'attributeRequest';
const url = /attributes/;

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
});

MultiSteps([
    Given,
    And,
], 'I open {string} page', (page) => {
    cy.visit(`/${page}`);
    cy
        .url()
        .should('include', `/${page}`);
    cy
        .wait(`@${requestName}_GET`)
        .its('response.statusCode')
        .should('eq', 200);
});

MultiSteps([
    Then,
    And,
], 'I send a {string} request and status code should be {int}', (reqType, status) => {
    cy
        .wait(`@${requestName}_${reqType}`)
        .then((xhr) => {
            expect(xhr.request.method).to.equal(reqType);
            expect(xhr.response.statusCode).to.equal(status);
        });
});
