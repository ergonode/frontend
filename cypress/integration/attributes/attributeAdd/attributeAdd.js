/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { And, When } from 'cypress-cucumber-preprocessor/steps';

When('I fill the {string} input with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`).find('input').type(term).should('have.value', term);
});

And('I choose {string} option from {string} select', (optionNr, id) => {
    cy.get(`[data-cy=${id}]`).click().should('be.visible');
    cy.get('[data-cy=selectDropDown]')
        .should('be.visible')
        .find('ul > li').eq(optionNr)
        .as('selectedOption');
    cy.get('@selectedOption').click();
    cy.get('@selectedOption').then(($opt) => {
        const optionValue = $opt.text().trim();

        cy.get(`[data-cy=${id}]`).find('[data-cy=selectValue] span').contains(optionValue);
    });
    cy.get('[data-cy=selectDropDown]').should('not.exist');
});
