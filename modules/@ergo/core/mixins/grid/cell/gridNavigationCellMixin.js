/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { getPositionForBrowser } from '@Core/models/drag_and_drop/helpers';

export default {
    data() {
        return {
            focusedCellCoordinates: { row: null, column: null },
            editingCellCoordinates: { row: null, column: null },
            test: '',
        };
    },
    methods: {
        onNavigateToCell(event) {
            const { keyCode } = event;
            const { row, column } = this.focusedCellCoordinates;
            let element;

            switch (keyCode) {
            case 13: {
                const elementToEdit = this.$el.querySelector(`[row="${row}"][column="${column}"]`);

                if (elementToEdit
                    && !(elementToEdit.classList.contains('grid-table-cell--locked')
                        || elementToEdit.classList.contains('grid-table-cell--disabled'))) {
                    this.editingCellCoordinates = {
                        row,
                        column,
                    };
                    this.test = 'DUPA';
                }

                break;
            }
            case 37:
                // Key: LEFT
                element = this.$el.querySelector(`[row="${row}"][column="${column - 1}"]`);
                if (element) {
                    this.focusedCellCoordinates = {
                        row,
                        column: column - 1,
                    };
                }
                break;
            case 38:
                // Key: UP
                if (row - 1 > -1) {
                    this.focusedCellCoordinates = {
                        row: row - 1,
                        column,
                    };
                    element = this.$el.querySelector(`[row="${row - 1}"][column="${column}"]`);
                }
                break;
            case 39:
            case 9:
                // Key: RIGHT || TAB
                this.focusedCellCoordinates = {
                    row,
                    column: column + 1,
                };
                element = this.$el.querySelector(`[row="${row}"][column="${column + 1}"]`);
                if (!element) {
                    // We get out of bounds - go to the next line
                    this.focusedCellCoordinates = {
                        row: row + 1,
                        column: 0,
                    };
                    element = this.$el.querySelector(`[row="${row + 1}"][column="0"]`);
                }
                break;
            case 40:
                // Key: DOWN
                element = this.$el.querySelector(`[row="${row + 1}"][column="${column}"]`);

                if (element) {
                    this.focusedCellCoordinates = {
                        row: row + 1,
                        column,
                    };
                }
                break;
            default: break;
            }

            event.preventDefault();

            if (element) {
                element.focus();
            }
        },
        onFocusCell(event) {
            const { xPos, yPos } = getPositionForBrowser(event);
            const tableCellElement = document.elementsFromPoint(xPos, yPos).find(element => element.hasAttribute('row'));

            if (tableCellElement) {
                this.focusedCellCoordinates = {
                    row: tableCellElement.getAttribute('row'),
                    column: tableCellElement.getAttribute('column'),
                };
                this.editingCellCoordinates = {
                    row: null,
                    column: null,
                };
            }
        },
    },
};
