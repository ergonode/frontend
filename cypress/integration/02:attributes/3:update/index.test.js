/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    And,
} from 'cypress-cucumber-preprocessor/steps';

const requestOptionName = 'attributeOptionRequest';
const url = /^(?!.*options)(?=.*attributes).*/;
const urlOpt = /attributes\/(.*?)\/options\/(.*?)/;

before(() => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

beforeEach(() => {
    cy.intercept(
        {
            method: 'PUT',
            url,
        },
    ).as(`${Cypress.spec.name}_PUT`);
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
    ).as(`${Cypress.spec.name}_GET`);
});

And('I send a {string} option request and status code should be {int}', (reqType, status) => {
    cy
        .wait(`@${requestOptionName}_${reqType}`)
        .then((xhr) => {
            expect(xhr.request.method).to.equal(reqType);
            expect(xhr.response.statusCode).to.equal(status);
        });
});
