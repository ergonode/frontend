/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const dictionaries = {
    lang: 'en/dictionary/languages',
    types: 'en/dictionary/attributes/types',
    list: 'en/languages?view=list',
    curr: 'en/dictionary/currencies',
    units: 'en/units?view=list',
    date: 'en/dictionary/date_format',
    priv: 'en/dictionary/privileges',
    sour: 'en/dictionary/sources',
};
context('Login ', () => {
    beforeEach(() => {
        cy.visit('');
        cy.resetDB();
        cy.request('POST', 'login').as('postLogin');
        cy.wrap(Object.keys(dictionaries)).each((d) => {
            cy.request('GET', dictionaries[d]).as(d);
        });
        cy.get('[data-cy=loginButton]').as('loginButton');
    });

    it('Login success', () => {
        const email = Cypress.env('adminEmail');
        const pass = Cypress.env('adminPass');

        cy.get('[data-cy=loginEmail]').find('input').type(email).should('have.value', email);
        cy.get('[data-cy=loginPass]').find('input').type(pass).should('have.value', pass);
        cy.get('@loginButton').click();
        cy.wait('@postLogin').its('status').should('eq', 200);
        cy.wrap(Object.keys(dictionaries)).each((d) => {
            cy.wait(`@${d}`).its('status').should('eq', 200);
        });
        cy.url().should('include', '/dashboard');
    });
});
