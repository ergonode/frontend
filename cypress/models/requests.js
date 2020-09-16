/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
let responseID = null;
let token = null;

export const visitPage = ({
    path, id,
}) => {
    let fullPath = `${path}/${id}`;

    if (id === 'this') {
        fullPath = `${path}/${responseID}`;
    }
    cy.url()
        .should('include', fullPath);
};

export const getToken = () => {
    cy.getCookie('jwt')
        .should('exist')
        .then((c) => {
            token = c.value;
        });
};

export const sendRequest = ({
    reqType, status, urlRegExp,
}) => {
    cy
        .wait(`@${reqType}-REQUEST`)
        .should((xhr) => {
            expect(xhr.method).to.equal(reqType);
            expect(xhr.status, 'Successful response').to.equal(status);
            expect(xhr.url, 'Response URL').to.match(urlRegExp);
            if (reqType === 'POST') {
                responseID = xhr.response.body.id;
            }
        });
};
