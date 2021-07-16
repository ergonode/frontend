/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

const commands = [];

Cypress.on('test:after:run', (attributes) => {
    /* eslint-disable no-console */
    console.log('Test "%s" has finished in %dms',
        attributes.title, attributes.duration);
    console.table(commands);
    commands.length = 0;
});

Cypress.on('command:start', (c) => {
    commands.push({
        name: c.attributes.name,
        args: c.attributes.args.toString(),
        started: +new Date(),
    });
});

Cypress.on('command:end', (c) => {
    const lastCommand = commands[commands.length - 1];

    if (lastCommand.name !== c.attributes.name) {
        throw new Error('Last command is wrong');
    }

    lastCommand.endedAt = +new Date();
    lastCommand.elapsed = `${lastCommand.endedAt - lastCommand.started} ms`;
});

Cypress.Commands.add('login', (email, pass) => {
    cy.getCookie('token')
        .then((token) => {
            if (!token) {
                cy.visit('');
                cy.intercept('POST', '**/login').as('postLogin');
                cy.intercept('GET', '**/profile').as('profile');
                cy.intercept('GET', '**/languages?limit=9999&offset=0&view=list&field=name&order=ASC').as('languages');
                cy.intercept('GET', '**/language/tree').as('languageTree');
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
                    .its('response.statusCode')
                    .should('eq', 200);
                cy
                    .wait('@profile')
                    .its('response.statusCode')
                    .should('eq', 200);
                cy
                    .wait('@languages')
                    .its('response.statusCode')
                    .should('eq', 200);
                cy
                    .wait('@languageTree')
                    .its('response.statusCode')
                    .should('eq', 200);
                cy
                    .url()
                    .should('include', '/dashboard');
            }
        });
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

Cypress.Commands.add('checkRequest', ({
    requestAlias, statusCode,
}) => {
    cy
        .wait(requestAlias)
        .its('response.statusCode')
        .should('eq', statusCode);
});

Cypress.Commands.add('sendRequest', ({
    requestName, reqType, status,
}) => {
    cy
        .wait(`@${requestName}_${reqType}`)
        .then((xhr) => {
            expect(xhr.request.method).to.equal(reqType);
            expect(xhr.response.statusCode).to.equal(status);
        });
});

Cypress.Commands.add('openPage', ({
    page, requestAliases = [],
}) => {
    cy.visit(`/${page}`);
    cy
        .url()
        .should('include', `/${page}`);

    cy.wrap(requestAliases)
        .each((requestAlias) => {
            cy.checkRequest({
                requestAlias,
                statusCode: 200,
            });
        });
});
