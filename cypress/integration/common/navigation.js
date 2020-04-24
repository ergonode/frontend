import { Then, And, When } from 'cypress-cucumber-preprocessor/steps';

Then('I open {string} page', (page) => {
    cy.visit(`/${page}`);
    cy.url().should('include', `/${page}`);
});

And('I click on {string} button', (id) => {
    cy.get(`[data-cy=${id}]`).click();
});

When('Element {string} is {string}', (id, state) => {
    cy.get(`[data-cy=${id}]`).should(`be.${state}`);
});
