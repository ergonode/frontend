import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am authenticated as admin', () => {
    cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
});

Then('I am logout', () => {
    cy.logout();
});
