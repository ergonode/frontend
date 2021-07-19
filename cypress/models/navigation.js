/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    escapeStringRegexp,
} from './index';

export const openPage = ({
    page, requestName,
}) => {
    cy.visit(`/${page}`);
    cy
        .url()
        .should('include', `/${page}`);
    cy
        .wait(`@${requestName}_GET`)
        .its('response.statusCode')
        .should('eq', 200);
};

export const sendRequest = ({
    requestName, reqType, status,
}) => {
    cy
        .wait(`@${requestName}_${reqType}`)
        .then((xhr) => {
            expect(xhr.request.method).to.equal(reqType);
            expect(xhr.response.statusCode).to.equal(status);
        });
};

export const checkGridRow = ({
    gridId, searchValue, columns,
}) => {
    const parsedColumns = JSON.parse(columns.replace(/'/g, '"'));

    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find('.grid-footer')
        .get('[data-cy=grid-footer-show]')
        .chooseOption('200');
    cy
        .get('@grid')
        .contains(new RegExp(`^${escapeStringRegexp(searchValue)}$`, 'g'))
        .parents('.grid-table-cell')
        .as('row');
    cy
        .get('@row')
        .then((c) => {
            const rowNr = c.attr('row');

            cy
                .wrap(Object.keys(parsedColumns))
                .each((columnIndex) => {
                    cy
                        .get('@grid')
                        .find(`.coordinates-${columnIndex}-${rowNr}`)
                        .should('exist')
                        .as(`checkingCell${columnIndex}`);

                    switch (parsedColumns[columnIndex]) {
                    case true:
                        cy
                            .get(`@checkingCell${columnIndex}`)
                            .find('input');
                        break;
                    case false:
                        cy
                            .get(`@checkingCell${columnIndex}`)
                            .find('input')
                            .should('be.not.checked');
                        break;
                    case '':
                        cy
                            .get(`@checkingCell${columnIndex}`)
                            .should('have.value', '');
                        break;
                    default:
                        cy
                            .get(`@checkingCell${columnIndex}`)
                            .contains(parsedColumns[columnIndex]);
                    }
                });
        });
};

export const noGridRow = ({
    gridId, searchValue,
}) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find('.grid-footer')
        .get('[data-cy=grid-footer-show]')
        .chooseOption('200');
    cy
        .get('@grid')
        .find('.grid-table-cell > span')
        .should('not.have.value', searchValue);
};

export const actionOnGrid = ({
    gridId, action, searchValue,
}) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find('.grid-footer')
        .get('[data-cy=grid-footer-show]')
        .chooseOption('200');
    cy
        .get('@grid')
        .find('.grid-table-cell')
        .contains(new RegExp(`^${escapeStringRegexp(searchValue)}$`, 'g'))
        .parents('.grid-table-cell')
        .as('row');
    cy
        .get('@row')
        .then((c) => {
            const rowNr = c.attr('row');

            cy
                .get(`[data-cy=action-${action}-${rowNr}]`)
                .as('action');
            cy
                .get('@action')
                .click({
                    force: true,
                });
        });
};

export const noActionOnGrid = ({
    gridId, action, searchValue,
}) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find('.grid-footer')
        .get('[data-cy=grid-footer-show]')
        .chooseOption('200');
    cy
        .get('@grid')
        .find('.grid-table-cell')
        .contains(new RegExp(`^${escapeStringRegexp(searchValue)}$`, 'g'))
        .parents('.grid-table-cell')
        .as('row');
    cy
        .get('@row')
        .then((c) => {
            const rowNr = c.attr('row');

            cy
                .get(`[data-cy=action-${action}-${rowNr}]`)
                .should('not.exist');
        });
};

export const editOnGrid = ({
    gridId, searchValue, columns,
}) => {
    const parsedColumns = JSON.parse(columns.replace(/'/g, '"'));

    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');
    cy
        .get('@grid')
        .find('.grid-footer')
        .get('[data-cy=grid-footer-show]')
        .chooseOption('200');
    cy
        .get('@grid')
        .find('.grid-table-cell')
        .contains(new RegExp(`^${escapeStringRegexp(searchValue)}$`, 'g'))
        .parents('.grid-table-cell')
        .as('row');
    cy
        .get('@row')
        .then((c) => {
            const rowNr = c.attr('row');

            cy
                .wrap(Object.keys(parsedColumns))
                .each((columnIndex) => {
                    cy
                        .get('@grid')
                        .find(`.coordinates-${columnIndex}-${rowNr}`)
                        .should('exist')
                        .as(`checkingCell${columnIndex}`);
                    switch (parsedColumns[columnIndex]) {
                    case true:
                        cy
                            .get(`@checkingCell${columnIndex}`)
                            .find('.checkbox')
                            .click();
                        break;
                    case false:
                        cy
                            .get(`@checkingCell${columnIndex}`)
                            .find('.checkbox')
                            .click();
                        break;
                    default:
                        cy
                            .get(`@checkingCell${columnIndex}`)
                            .find('input')
                            .fill(parsedColumns[columnIndex])
                            .should('have.value', parsedColumns[columnIndex]);
                    }
                });
        });
};
