/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { And, When, Then } from 'cypress-cucumber-preprocessor/steps';

let responseID = null;
let token = null;

beforeEach(() => {
    cy.apiRequest('POST', 'en/attributes').as('POST-REQUEST');
});

When('I fill the {string} input with the {string} term', (id, term) => {
    cy.get(`[data-cy=${id}]`).find('input').type(term).should('have.value', term);
    cy.getCookie('jwt')
        .should('exist')
        .then((c) => {
            token = c.value;
        });
});

And('I choose {string} option from {string} select', (optionNr, id) => {
    cy.get(`[data-cy=${id}]`).click().should('be.visible');
    cy.get('[data-cy=selectDropDown]')
        .should('be.visible')
        .find('ul > li').as('elementList');
    cy.get('@elementList').its('length').should('be.gt', 1);
    cy.get('@elementList').eq(optionNr).as('selectedOption');
    cy.get('@selectedOption').click();
    cy.get('@selectedOption').then(($opt) => {
        const optionValue = $opt.text().trim();

        cy.get(`[data-cy=${id}]`).find('[data-cy=selectValue] span').contains(optionValue);
    });
    cy.get('[data-cy=selectDropDown]').should('not.exist');
});

Then('I visit on edit page for {string} element', (element) => {
    let path = `/attributes/attribute/${element}`;

    if (element === 'this') {
        path = `/attributes/attribute/${responseID}`;
    }
    cy.url().should('include', path);
});

Then('I send a {string} request and status code should be {int}', (reqType, status) => {
    cy.wait(`@${reqType}-REQUEST`).should((xhr) => {
        expect(xhr.method).to.equal(reqType);
        expect(xhr.status, 'Successful response').to.equal(status);
        expect(xhr.url, 'Response URL').to.match(/\/en\/attributes$/);
        responseID = xhr.response.body.id;
    });
});

Then('On {string} I can see {int} row with data on column: {string}', (gridId, rowNr, columns) => {
    const parsedColumns = JSON.parse(columns.replace(/'/g, '"'));

    cy.get(`[data-cy=${gridId}]`).should('be.visible').as('grid');
    cy.wrap(Object.keys(parsedColumns)).each((columnIndex) => {
        cy.get('@grid').find(`.coordinates-${columnIndex}-${rowNr + 2}`).should('be.visible')
            .as('checkingCell');
        if (parsedColumns[columnIndex] === 'true' || parsedColumns[columnIndex] === 'false') {
            cy.get('@checkingCell').find('input').should('have.value', parsedColumns[columnIndex]);
        } else {
            cy.get('@checkingCell').contains(parsedColumns[columnIndex]);
        }
    });
});

Then('I remove {string} element by {string} request', (element, reqType) => {
    let path = `en/attributes/${element}`;

    if (element === 'this') {
        path = `en/attributes/${responseID}`;
    }

    cy.request({
        method: reqType,
        url: `${Cypress.env('apiServer')}${path}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            JWTAuthorization: `Bearer ${token}`,
        },
    }).should((response) => {
        expect(response.status).to.eq(204);
    });
    cy.reload();
});
