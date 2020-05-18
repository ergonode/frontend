/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
context('Change User Avatar', () => {
    before(() => {
        cy.login(Cypress.env('adminEmail'), Cypress.env('adminPass'));
        cy.visit('/users');
    });

    describe('Navigate to User edition avatar subpage', () => {
        it('Select random User by clicking edit in users grid', () => {
            cy.selectRandomUser();
        });

        it('Navigate to avatar tab', () => {
            cy.get('a').contains('Avatar').click();
        });

        it('Upload file', () => {
            cy.fixture('images/avatar.png', 'base64').as('avatar');
            cy.get('input[type=file]').then(() => {
                // FIXME: Cypress does not work - InvalidCharacterError: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.
                // return Cypress.Blob.base64StringToBlob('@avatar', 'image/png').then((blob) => {
                //
                // });
            });
        });
    });
});
