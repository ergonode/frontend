/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    escapeStringRegexp,
} from './index';

export const checkGridRows = ({
    id,
    values,
}) => {
    const parsedValues = JSON.parse(values.replace(/'/g, '"'));

    cy.getBySel(id).as('grid');

    parsedValues.forEach((value) => {
        const [
            entry,
        ] = Object.entries(value);
        const [
            columnId,
            rowValue,
        ] = entry;

        cy.getBySel(columnId).then((element) => {
            const columnIndex = element.attr('column');

            cy
                .get('@grid')
                .find('.grid-column')
                .eq(columnIndex)
                .contains(rowValue)
                .should('exist');
        });
    });
};

export const checkGridRow = ({
    gridId, searchValue, columns, showMoreRows = true,
}) => {
    const parsedColumns = JSON.parse(columns.replace(/'/g, '"'));

    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');

    if (showMoreRows) {
        cy
            .get('@grid')
            .find('.grid-footer')
            .get('[data-cy=grid-visible-rows-select]')
            .chooseSelectOption('200');
    }

    cy
        .get('@grid')
        .find('.grid-column')
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
    gridId, searchValue, showMoreRows = true,
}) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');

    if (showMoreRows) {
        cy
            .get('@grid')
            .find('.grid-footer')
            .get('[data-cy=grid-visible-rows-select]')
            .chooseSelectOption('200');
    }

    cy
        .get('@grid')
        .find('.grid-table-cell > span')
        .should('not.have.value', searchValue);
};

export const actionOnGrid = ({
    gridId, action, searchValue, showMoreRows = true,
}) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');

    if (showMoreRows) {
        cy
            .get('@grid')
            .find('.grid-footer')
            .get('[data-cy=grid-visible-rows-select]')
            .chooseSelectOption('200');
    }

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
    gridId, action, searchValue, showMoreRows = true,
}) => {
    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');

    if (showMoreRows) {
        cy
            .get('@grid')
            .find('.grid-footer')
            .get('[data-cy=grid-visible-rows-select]')
            .chooseSelectOption('200');
    }

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
    gridId, searchValue, columns, showMoreRows = true,
}) => {
    const parsedColumns = JSON.parse(columns.replace(/'/g, '"'));

    cy
        .get(`[data-cy=${gridId}]`)
        .should('be.visible')
        .as('grid');

    if (showMoreRows) {
        cy
            .get('@grid')
            .find('.grid-footer')
            .get('[data-cy=grid-visible-rows-select]')
            .chooseSelectOption('200');
    }

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
