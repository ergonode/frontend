/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const data = {
    incorrect: {
        email: 'test@test.pl',
        pass: '123',
    },
    incorrectEmail: {
        email: 'test',
        pass: '123',
    },
    correct: {
        email: Cypress.env('adminEmail'),
        pass: Cypress.env('adminPass'),
    },
    dictionaries: {
        types: 'dictionary/attributes/types',
        curr: 'dictionary/currencies',
        units: 'units?view=list',
        date: 'dictionary/date_format',
        priv: 'dictionary/privileges',
        sour: 'dictionary/sources',
    },
};

context('Login page', () => {
    beforeEach(() => {
        cy.visit('');
        cy.apiRequest('POST', 'login')
            .as('postLogin');
        cy.get('[data-cy=login-email]')
            .as('loginEmail');
        cy.get('[data-cy=login-pass]')
            .as('loginPass');
        cy.get('[data-cy=submit]')
            .as('loginButton');
    });

    describe('Login fail', () => {
        it('Without data', () => {
            cy.get('@loginButton')
                .click();
            cy.wait('@postLogin')
                .its('status')
                .should('eq', 401);
        });

        it('Incorrect email', () => {
            cy.get('@loginEmail')
                .find('input')
                .type(data.incorrectEmail.email)
                .should('have.value', data.incorrectEmail.email);
            cy.get('@loginPass')
                .find('input')
                .type(data.incorrectEmail.pass)
                .should('have.value', data.incorrectEmail.pass);
            cy.get('@loginButton')
                .click();
            cy.wait('@postLogin')
                .its('status')
                .should('eq', 500);
        });

        it('Incorrect data', () => {
            cy.get('@loginEmail')
                .find('input')
                .type(data.incorrect.email)
                .should('have.value', data.incorrect.email);
            cy.get('@loginPass')
                .find('input')
                .type(data.incorrect.pass)
                .should('have.value', data.incorrect.pass);
            cy.get('@loginButton')
                .click();
            cy.wait('@postLogin')
                .its('status')
                .should('eq', 401);
        });
    });

    describe('Login success', () => {
        before(() => {
            cy.wrap(Object.keys(data.dictionaries))
                .each((d) => {
                    cy.apiRequest('GET', data.dictionaries[d])
                        .as(d);
                });
        });

        it('Correct data', () => {
            cy.get('@loginEmail')
                .find('input')
                .type(data.correct.email)
                .should('have.value', data.correct.email);
            cy.get('@loginPass')
                .find('input')
                .type(data.correct.pass)
                .should('have.value', data.correct.pass);
            cy.get('@loginButton')
                .click();
            cy.wait('@postLogin')
                .its('status')
                .should('eq', 200);
            cy.wrap(Object.keys(data.dictionaries))
                .each((d) => {
                    cy.wait(`@${d}`)
                        .its('status')
                        .should('eq', 200);
                });
            cy.url()
                .should('include', '/dashboard');
        });
    });
});
