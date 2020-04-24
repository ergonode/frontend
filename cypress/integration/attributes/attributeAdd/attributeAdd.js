import { Then, And, When } from 'cypress-cucumber-preprocessor/steps';

Then('I fill the {string} input with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`).find('input').type(term).should('have.value', term);
});

Then('I choose {string} option from {string} field', (option, id) => {
    cy.get(`[data-cy=${id}]`).find('input').click({ force: true }).should('be.visible');
});
