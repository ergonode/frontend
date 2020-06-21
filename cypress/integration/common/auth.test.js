/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Given,
    Then,
} from 'cypress-cucumber-preprocessor/steps';

Given('I am authenticated as {string}', (role) => {
    cy.login(Cypress.env(`${role}Email`), Cypress.env(`${role}Pass`));
});

Given('I am authenticated by email: {string} and password: {string}', (email, pass) => {
    cy.login(email, pass);
});

Then('I am logout', () => {
    cy.logout();
});
