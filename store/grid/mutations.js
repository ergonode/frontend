/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    clearStorage: (state) => {
        state.numberOfDisplayedElements = 25;
        state.columns = [];
        state.rows = [];
        state.count = 0;
        state.filtered = 0;
        state.filter = '';
        state.globalFilters = [];
        state.displayedPage = 1;
        state.configuration = {};
        state.sortedByColumn = {};
        state.isSelectedAllRows = false;
        state.selectedRows = {};
        state.editingCellCoordinates = {};
    },
    setEditingCellCoordinates: (state, editingCellCoordinates) => {
        state.editingCellCoordinates = editingCellCoordinates;
    },
    setConfiguration: (state, configuration) => {
        state.configuration = configuration;
    },
    setColumns: (state, { columns }) => {
        state.columns = columns;
    },
    setRows: (state, payload) => {
        state.rows = payload;
    },
    setCount: (state, payload) => {
        state.count = payload;
    },
    setFiltered: (state, payload) => {
        state.filtered = payload;
    },
    setFilter: (state, { filter, id }) => {
        state.filter = { ...state.filter, [id]: filter };
    },
    deleteFilter: (state, { id }) => {
        delete state.filter[id];
        state.filter = { ...state.filter };
    },
    setDisplayingPage: (state, payload) => {
        state.displayedPage = payload;
    },
    setSortingState: (state, sortedColumn = {}) => {
        state.sortedByColumn = sortedColumn;
    },
    insertColumnAtIndex: (state, { column, index }) => {
        state.columns = [
            ...state.columns.slice(0, index),
            column,
            ...state.columns.slice(index),
        ];
    },
    removeColumnAtIndex: (state, { index }) => {
        state.columns.splice(index, 1);
    },
    setSelectionForAllRows: (state, { isSelected }) => {
        state.isSelectedAllRows = isSelected;
    },
    setSelectedRows: (state, { rows }) => {
        state.selectedRows = rows;
    },
    setSelectedRow: (state, { row }) => {
        state.selectedRows = { ...state.selectedRows, [row]: true };
    },
    removeSelectedRow: (state, { row }) => {
        delete state.selectedRows[row];
        state.selectedRows = { ...state.selectedRows };
    },
    removeSelectedRows: (state) => {
        state.selectedRows = {};
    },
    addDraftToProductAtIndex: (state, { index, product }) => {
        state.rows[index] = product;
        state.rows = [...state.rows];
    },
    setNumberOfDisplayingElements: (state, { number }) => {
        state.numberOfDisplayedElements = Number(number);
    },
};
