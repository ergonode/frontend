/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DICTIONARIES,
} from '../defaults';

Cypress.Commands.add('apiRequest', ({
    method, url, alias,
}) => {
    cy.server();
    cy
        .route({
            method,
            url: `**/${url}`,
        })
        .as(alias);
});

Cypress.Commands.add('login', (email, pass) => {
    cy.server();

    cy.clearCookies();
    cy.visit('');
    cy
        .wrap(Object.keys(DICTIONARIES))
        .each((d) => {
            cy
                .route({
                    method: 'GET',
                    url: `**/${DICTIONARIES[d]}`,
                })
                .as(d);
        });
    cy
        .route({
            method: 'POST',
            url: '**/login',
        })
        .as('postLogin');
    cy
        .route({
            method: 'GET',
            url: '**/profile',
        })
        .as('profile');
    cy
        .get('[data-cy=login-email]')
        .find('input')
        .type(email)
        .should('have.value', email);
    cy
        .get('[data-cy=login-pass]')
        .find('input')
        .type(pass)
        .should('have.value', pass);
    cy
        .get('[data-cy=submit]')
        .click();
    cy
        .wait('@postLogin')
        .its('status')
        .should('eq', 200);
    cy
        .wait('@profile')
        .its('status')
        .should('eq', 200);
    cy
        .wrap(Object.keys(DICTIONARIES))
        .each((d) => {
            cy
                .wait(`@${d}`)
                .its('status')
                .should('eq', 200);
        });
    cy
        .url()
        .should('include', '/dashboard');
});

Cypress.Commands.add('logout', () => {
    cy
        .get('[data-cy=tool-bar-dropdown]')
        .click();
    cy
        .get('[data-cy=tool-bar-content]')
        .should('be.visible');
    cy
        .get('[data-cy=logout-button]')
        .click();
    cy
        .url()
        .should('include', '');
});

Cypress.Commands.add('selectRandomUser', () => {
    cy
        .get('.action-link')
        .then((links) => {
            const {
                length,
            } = links;
            links[length - 1].click();
        });
    cy
        .url()
        .should('include', 'users/edit');
});

Cypress.on('uncaught:exception', (err) => {
    console.log(err);
    return false;
});
