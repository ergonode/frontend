/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    And,
    Given,
    When,
} from 'cypress-cucumber-preprocessor/steps';

import {
    requestTypes,
} from '../../../defaults';
import {
    MultiSteps,
} from '../../../models';

beforeEach(() => {
    cy.intercept(
        {
            method: 'POST',
            url: /login/,
        },
    ).as(`${Cypress.spec.name}_POST`);
    cy.intercept(
        {
            method: 'GET',
            url: /profile/,
        },
    ).as(`${Cypress.spec.name}_GET`);
});

Given('I open {string} page', (page) => {
    cy.visit({
        url: page,
        log: false,
        retryOnNetworkFailure: false,
    });
    cy.checkUrl(page);
});

MultiSteps([
    When,
    And,
], 'I {string} the data and {string} is {string}', (button, action, status) => {
    let statusCodes = null;
    const requestType = requestTypes[action];

    switch (status) {
    case 'incorrect':
        statusCodes = 401;
        break;
    case 'correct':
        statusCodes = 200;
        break;
    default:
        statusCodes = null;
    }

    if (requestType && statusCodes) {
        cy.getBySel(button)
            .click();
        cy.sendRequest({
            requestName: Cypress.spec.name,
            requestType,
            status: statusCodes,
        });
    }
});

And('On login page I fill the {string} input with the {string} term', (id, term) => {
    cy.getBySel(id)
        .find('input')
        .fill(Cypress.env(term))
        .should('have.value', Cypress.env(term));
});

And('On {string} input I can see {string} term', (id, term) => {
    cy.getBySel(id)
        .find("[type='text']")
        .should('have.value', term);
});
