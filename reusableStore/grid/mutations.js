/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { insertValueAtIndex } from '~/model/arrayWrapper';

export const types = {
    SET_EDITING_CELL_COORDINATES: 'SET_EDITING_CELL_COORDINATES',
    SET_CONFIGURATION: 'SET_CONFIGURATION',
    SET_COLUMNS: 'SET_COLUMNS',
    SET_PINNED_COLUMNS: 'SET_PINNED_COLUMNS',
    SET_ROWS: 'SET_ROWS',
    SET_COUNT: 'SET_COUNT',
    SET_FILTERED: 'SET_FILTERED',
    SET_FILTER: 'SET_FILTER',
    REMOVE_FILTER: 'REMOVE_FILTER',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_SORTING_STATE: 'SET_SORTING_STATE',
    INSERT_COLUMN_AT_INDEX: 'INSERT_COLUMN_AT_INDEX',
    UPDATE_COLUMN_AT_INDEX: 'UPDATE_COLUMN_AT_INDEX',
    REMOVE_COLUMN_AT_INDEX: 'REMOVE_COLUMN_AT_INDEX',
    SET_SELECTION_FOR_ALL_ROWS: 'SET_SELECTION_FOR_ALL_ROWS',
    SET_SELECTED_ROWS: 'SET_SELECTED_ROWS',
    SET_SELECTED_ROW: 'SET_SELECTED_ROW',
    SET_COLUMN_WIDTH_AT_INDEX: 'SET_COLUMN_WIDTH_AT_INDEX',
    REMOVE_SELECTED_ROW: 'REMOVE_SELECTED_ROW',
    REMOVE_SELECTED_ROWS: 'REMOVE_SELECTED_ROWS',
    ADD_DRAFT_TO_PRODUCT_AT_INDEX: 'ADD_DRAFT_TO_PRODUCT_AT_INDEX',
    SET_NUMBER_OF_ELEMENTS_TO_DISPLAY: 'SET_NUMBER_OF_ELEMENTS_TO_DISPLAY',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_EDITING_CELL_COORDINATES](state, editingCellCoordinates) {
        state.editingCellCoordinates = editingCellCoordinates;
    },
    [types.SET_CONFIGURATION](state, configuration) {
        state.configuration = configuration;
    },
    [types.SET_COLUMNS](state, columns) {
        state.columns = columns;
    },
    [types.SET_PINNED_COLUMNS](state, columns) {
        state.pinnedColumns = columns;
    },
    [types.SET_ROWS](state, payload) {
        state.rows = payload;
    },
    [types.SET_COUNT](state, payload) {
        state.count = payload;
    },
    [types.SET_FILTERED](state, payload) {
        state.filtered = payload;
    },
    [types.SET_FILTER](state, { id, filter }) {
        state.filter = { ...state.filter, [id]: filter };
    },
    [types.REMOVE_FILTER](state, id) {
        delete state.filter[id];
        state.filter = { ...state.filter };
    },
    [types.SET_CURRENT_PAGE](state, payload) {
        state.displayedPage = payload;
    },
    [types.SET_SORTING_STATE](state, sortedColumn = {}) {
        state.sortedByColumn = sortedColumn;
    },
    [types.UPDATE_COLUMN_AT_INDEX](state, { index, column }) {
        state.columns[index] = column;
        state.columns = [...state.columns];
    },
    [types.INSERT_COLUMN_AT_INDEX](state, { column, index }) {
        state.columns = insertValueAtIndex(state.columns, column, index);
    },
    [types.REMOVE_COLUMN_AT_INDEX](state, index) {
        state.columns.splice(index, 1);
    },
    [types.SET_SELECTION_FOR_ALL_ROWS](state, isSelected) {
        state.isSelectedAllRows = isSelected;
    },
    [types.SET_SELECTED_ROWS](state, rows) {
        state.selectedRows = rows;
    },
    [types.SET_COLUMN_WIDTH_AT_INDEX](state, { index, width }) {
        state.columns[index].width = width;
    },
    [types.SET_SELECTED_ROW](state, row) {
        state.selectedRows = { ...state.selectedRows, [row]: true };
    },
    [types.REMOVE_SELECTED_ROW](state, row) {
        delete state.selectedRows[row];
        state.selectedRows = { ...state.selectedRows };
    },
    [types.REMOVE_SELECTED_ROWS](state) {
        state.selectedRows = {};
    },
    [types.ADD_DRAFT_TO_PRODUCT_AT_INDEX](state, { index, product }) {
        state.rows[index] = product;
        state.rows = [...state.rows];
    },
    [types.SET_NUMBER_OF_ELEMENTS_TO_DISPLAY](state, number) {
        state.numberOfDisplayedElements = Number(number);
    },
    [types.CLEAR_STATE](state) {
        state.numberOfDisplayedElements = 25;
        state.columns = [];
        state.rows = [];
        state.count = 0;
        state.filtered = 0;
        state.filter = {};
        state.globalFilters = [];
        state.displayedPage = 1;
        state.configuration = {};
        state.sortedByColumn = {};
        state.isSelectedAllRows = false;
        state.selectedRows = {};
        state.editingCellCoordinates = {};
    },
};
