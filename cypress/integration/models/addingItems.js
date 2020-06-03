/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
let responseID = null;
let token = null;

export const visitPage = ({ path, id }) => {
    let fullPath = `${path}/${id}`;

    if (id === 'this') {
        fullPath = `${path}/${responseID}`;
    }
    cy.url().should('include', fullPath);
};

export const getToken = () => {
    cy.getCookie('jwt')
        .should('exist')
        .then((c) => {
            token = c.value;
        });
};

export const sendPostRequest = ({ reqType, status, urlRegExp }) => {
    cy.wait(`@${reqType}-REQUEST`).should((xhr) => {
        expect(xhr.method).to.equal(reqType);
        expect(xhr.status, 'Successful response').to.equal(status);
        expect(xhr.url, 'Response URL').to.match(urlRegExp);
        if (reqType === 'POST') {
            responseID = xhr.response.body.id;
        }
    });
};

export const checkGridRow = ({ gridId, rowNr, columns }) => {
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
};

export const noGridRow = ({ gridId, rowNr, columns }) => {
    const parsedColumns = JSON.parse(columns.replace(/'/g, '"'));

    cy.get(`[data-cy=${gridId}]`).should('be.visible').as('grid');
    cy.wrap(Object.keys(parsedColumns)).each((columnIndex) => {
        cy.get('@grid').find(`.coordinates-${columnIndex}-${rowNr + 2}`).should('not.exist');
    });
};

export const removeOnGrid = ({ gridId, action, rowNr }) => {
    cy.get(`[data-cy=${gridId}]`).should('be.visible').as('grid');
    cy.get('[data-cy=pinned-section]').as('pinned');
    cy.get('@pinned').find(`[column-id=${action}] .grid-table-cell`).eq(rowNr + 2).as('delete');
    cy.get('@delete').click({ force: true });
};

export const removeRequest = ({ element, reqType, path }) => {
    let fullPath = `${path}/${element}`;

    if (element === 'this') {
        fullPath = `${path}/${responseID}`;
    }

    cy.request({
        method: reqType,
        url: `${Cypress.env('apiServer')}${fullPath}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            JWTAuthorization: `Bearer ${token}`,
        },
    }).should((response) => {
        expect(response.status).to.eq(204);
    });
    cy.reload();
};
