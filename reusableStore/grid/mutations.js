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
    INSERT_PINNED_COLUMN_AT_INDEX: 'INSERT_PINNED_COLUMN_AT_INDEX',
    REMOVE_PINNED_COLUMN_AT_INDEX: 'REMOVE_PINNED_COLUMN_AT_INDEX',
    SET_CELL_VALUES: 'SET_CELL_VALUES',
    SET_ROW_IDS: 'SET_ROW_IDS',
    SET_COUNT: 'SET_COUNT',
    SET_FILTERED: 'SET_FILTERED',
    SET_ADVANCED_FILTER_AT_INDEX: 'SET_ADVANCED_FILTER_AT_INDEX',
    SET_ADVANCED_FILTER_VALUE_AT_INDEX: 'SET_ADVANCED_FILTER_VALUE_AT_INDEX',
    SET_ADVANCED_FILTERS: 'SET_ADVANCED_FILTERS',
    INSERT_ADVANCED_FILTER_AT_INDEX: 'INSERT_ADVANCED_FILTER_AT_INDEX',
    REMOVE_ADVANCED_FILTER_AT_INDEX: 'REMOVE_ADVANCED_FILTER_AT_INDEX',
    REMOVE_ALL_ADVANCED_FILTERS: 'REMOVE_ALL_ADVANCED_FILTERS',
    CLEAR_ALL_ADVANCED_FILTERS: 'CLEAR_ALL_ADVANCED_FILTERS',
    SET_BASIC_FILTER: 'SET_BASIC_FILTER',
    RELOAD_GRID_DATA: 'RELOAD_GRID_DATA',
    UPDATE_DATA_CELL_VALUE: 'UPDATE_DATA_CELL_VALUE',
    REMOVE_BASIC_FILTER: 'REMOVE_BASIC_FILTER',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_SORTING_STATE: 'SET_SORTING_STATE',
    INSERT_COLUMN_AT_INDEX: 'INSERT_COLUMN_AT_INDEX',
    INSERT_COLUMN_WIDTH_AT_INDEX: 'INSERT_COLUMN_WIDTH_AT_INDEX',
    UPDATE_COLUMN_AT_INDEX: 'UPDATE_COLUMN_AT_INDEX',
    REMOVE_COLUMN_AT_INDEX: 'REMOVE_COLUMN_AT_INDEX',
    REMOVE_COLUMN_WIDTH_AT_INDEX: 'REMOVE_COLUMN_WIDTH_AT_INDEX',
    SET_SELECTION_FOR_ALL_ROWS: 'SET_SELECTION_FOR_ALL_ROWS',
    SET_COLUMN_WIDTHS: 'SET_COLUMN_WIDTHS',
    SET_SELECTED_ROWS: 'SET_SELECTED_ROWS',
    SET_SELECTED_ROW: 'SET_SELECTED_ROW',
    SET_COLUMN_WIDTH_AT_INDEX: 'SET_COLUMN_WIDTH_AT_INDEX',
    REMOVE_SELECTED_ROW: 'REMOVE_SELECTED_ROW',
    REMOVE_SELECTED_ROWS: 'REMOVE_SELECTED_ROWS',
    ADD_PRODUCT_VALUE: 'ADD_PRODUCT_VALUE',
    SET_NUMBER_OF_ELEMENTS_TO_DISPLAY: 'SET_NUMBER_OF_ELEMENTS_TO_DISPLAY',
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
    [types.INSERT_PINNED_COLUMN_AT_INDEX](state, { index, column }) {
        state.pinnedColumns = insertValueAtIndex(state.pinnedColumns, column, index);
    },
    [types.INSERT_ADVANCED_FILTER_AT_INDEX](state, { index, filter }) {
        state.advancedFilters = insertValueAtIndex(state.advancedFilters, filter, index);
    },
    [types.REMOVE_PINNED_COLUMN_AT_INDEX](state, index) {
        state.pinnedColumns.splice(index, 1);
    },
    [types.SET_CELL_VALUES](state, values) {
        state.cellValues = values;
    },
    [types.SET_ROW_IDS](state, ids) {
        state.rowIds = ids;
    },
    [types.SET_COUNT](state, payload) {
        state.count = payload;
    },
    [types.SET_FILTERED](state, payload) {
        state.filtered = payload;
    },
    [types.SET_BASIC_FILTER](state, { id, filter }) {
        state.basicFilters = { ...state.basicFilters, [id]: filter };
    },
    [types.REMOVE_BASIC_FILTER](state, id) {
        delete state.basicFilters[id];
        state.basicFilters = { ...state.basicFilters };
    },
    [types.SET_ADVANCED_FILTER_AT_INDEX](state, { index, filter }) {
        state.advancedFilters[index] = filter;
        state.advancedFilters = [...state.advancedFilters];
    },
    [types.SET_ADVANCED_FILTER_VALUE_AT_INDEX](state, { index, value }) {
        state.advancedFilters[index].value = value;
        state.advancedFilters = [...state.advancedFilters];
    },
    [types.SET_ADVANCED_FILTERS](state, advancedFilters) {
        state.advancedFilters = advancedFilters;
    },
    [types.REMOVE_ALL_ADVANCED_FILTERS](state) {
        state.advancedFilters = [];
    },
    [types.CLEAR_ALL_ADVANCED_FILTERS](state) {
        state.advancedFilters = state.advancedFilters.map(
            (filter) => ({ ...filter, value: null }),
        );
    },
    [types.REMOVE_ADVANCED_FILTER_AT_INDEX](state, index) {
        state.advancedFilters.splice(index, 1);
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
        state.columns = insertValueAtIndex([...state.columns], column, index);
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
        state.columnWidths[index] = width;
        state.columnWidths = [...state.columnWidths];
    },
    [types.INSERT_COLUMN_WIDTH_AT_INDEX](state, { index, width }) {
        state.columnWidths = insertValueAtIndex([...state.columnWidths], width, index);
    },
    [types.SET_COLUMN_WIDTHS](state, columnWidths) {
        state.columnWidths = columnWidths;
    },
    [types.REMOVE_COLUMN_WIDTH_AT_INDEX](state, index) {
        state.columnWidths.splice(index, 1);
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
    [types.RELOAD_GRID_DATA](state) {
        state.cellValues = { ...state.cellValues };
    },
    [types.UPDATE_DATA_CELL_VALUE](state, { rowId, columnId, value }) {
        state.cellValues[rowId][columnId] = { value };
    },
    [types.ADD_PRODUCT_VALUE](state, { productId, columnId, value }) {
        state.cellValues[productId][columnId] = value;
    },
    [types.SET_NUMBER_OF_ELEMENTS_TO_DISPLAY](state, number) {
        state.numberOfDisplayedElements = Number(number);
    },
};
