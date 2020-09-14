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
    cy.url().should('include', fullPath);
};

export const getToken = () => {
    cy.getCookie('jwt')
        .should('exist')
        .then((c) => {
            token = c.value;
        });
};

export const sendPostRequest = ({
    reqType, status, urlRegExp,
}) => {
    cy.wait(`@${reqType}-REQUEST`).should((xhr) => {
        expect(xhr.method).to.equal(reqType);
        expect(xhr.status, 'Successful response').to.equal(status);
        expect(xhr.url, 'Response URL').to.match(urlRegExp);
        if (reqType === 'POST') {
            responseID = xhr.response.body.id;
        }
    });
};

export const checkGridRow = ({
    gridId, searchValue, columns,
}) => {
    const parsedColumns = JSON.parse(columns.replace(/'/g, '"'));

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);
    cy.get(`[data-cy=${gridId}]`).should('be.visible').as('grid');
    cy.get('@grid').find('.grid-table-cell').contains(searchValue).parent()
        .as('row');
    cy.get('@row').then((c) => {
        const rowNr = c.attr('row');

        cy.wrap(Object.keys(parsedColumns)).each((columnIndex) => {
            cy.get('@grid').find(`.coordinates-${columnIndex}-${rowNr}`).should('be.visible')
                .as(`checkingCell${columnIndex}`);
            if (parsedColumns[columnIndex] === 'true' || parsedColumns[columnIndex] === 'false') {
                cy.get(`@checkingCell${columnIndex}`).find('input').should('have.value', parsedColumns[columnIndex]);
            } else {
                cy.get(`@checkingCell${columnIndex}`).contains(parsedColumns[columnIndex]);
            }
        });
    });
};

export const noGridRow = ({
    gridId, searchValue,
}) => {
    cy.get(`[data-cy=${gridId}]`).should('be.visible').as('grid');
    cy.get('@grid').find('.grid-table-cell').should('not.have.value', searchValue);
};

export const actionOnGrid = ({
    gridId, action, searchValue,
}) => {
    cy.get(`[data-cy=${gridId}]`).should('be.visible').as('grid');
    cy.get('@grid').find('.grid-table-cell').contains(searchValue).parent()
        .as('row');
    cy.get('@row').then((c) => {
        const rowNr = c.attr('row');

        cy.get(`[data-cy=action-${action}-${rowNr}]`).as('action');
        cy.get('@action').click({
            force: true,
        });
    });
};

export const removeRequest = ({
    element, reqType, path,
}) => {
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
