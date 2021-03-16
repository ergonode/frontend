/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

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
        .contains(searchValue)
        .parent()
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
                        .should('be.visible')
                        .as(`checkingCell${columnIndex}`);
                    if (parsedColumns[columnIndex] === 'true' || parsedColumns[columnIndex] === 'false') {
                        cy
                            .get(`@checkingCell${columnIndex}`)
                            .find('input')
                            .should('have.value', parsedColumns[columnIndex]);
                    } else {
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
        .find('.grid-table-cell')
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
        .find('.grid-table-cell')
        .contains(searchValue)
        .parent()
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
