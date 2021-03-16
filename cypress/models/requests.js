/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
let responseID = null;

export const sendRequest = ({
    reqType, status, requestName,
}) => {
    cy
        .wait(`@${requestName}_${reqType}`)
        .should((xhr) => {
            expect(xhr.method).to.equal(reqType);
            expect(xhr.status, 'Successful response').to.equal(status);
            if (reqType === 'POST') {
                responseID = xhr.response.body.id;
            }
        });
};

export const removeRequest = ({
    path,
}) => {
    const fullPath = `${Cypress.env('defaultLanguage')}/${path}/${responseID}`;

    cy.getCookie('token')
        .should('exist')
        .then((c) => {
            const token = c.value;

            cy.request({
                method: 'DELETE',
                url: `${Cypress.env('apiServer')}${fullPath}`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    JWTAuthorization: `Bearer ${token}`,
                },
            }).should((response) => {
                expect(response.status).to.eq(204);
            });
        });
    cy.reload();
};
