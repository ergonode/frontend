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
    SET_ROW_LINKS: 'SET_ROW_LINKS',
    SET_COUNT: 'SET_COUNT',
    SET_FILTERED: 'SET_FILTERED',
    SET_ADVANCED_FILTER_AT_INDEX: 'SET_ADVANCED_FILTER_AT_INDEX',
    SET_ADVANCED_FILTERS: 'SET_ADVANCED_FILTERS',
    SET_ADVANCED_FILTER: 'SET_ADVANCED_FILTER',
    INSERT_ADVANCED_FILTER_AT_INDEX: 'INSERT_ADVANCED_FILTER_AT_INDEX',
    REMOVE_ADVANCED_FILTER_AT_INDEX: 'REMOVE_ADVANCED_FILTER_AT_INDEX',
    REMOVE_ALL_ADVANCED_FILTERS: 'REMOVE_ALL_ADVANCED_FILTERS',
    REMOVE_FILTER_FOR_OPERATOR: 'REMOVE_FILTER_FOR_OPERATOR',
    CLEAR_ALL_ADVANCED_FILTERS: 'CLEAR_ALL_ADVANCED_FILTERS',
    SET_FILTER: 'SET_FILTER',
    RELOAD_GRID_DATA: 'RELOAD_GRID_DATA',
    UPDATE_DATA_CELL_VALUE: 'UPDATE_DATA_CELL_VALUE',
    REMOVE_FILTER: 'REMOVE_FILTER',
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
        state.advancedFiltersData = insertValueAtIndex(state.advancedFiltersData, filter, index);
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
    [types.SET_ROW_LINKS](state, links) {
        state.rowLinks = links;
    },
    [types.SET_COUNT](state, payload) {
        state.count = payload;
    },
    [types.SET_FILTERED](state, payload) {
        state.filtered = payload;
    },
    [types.SET_FILTER](state, { id, filter, operator }) {
        state.filters = { ...state.filters, [id]: { value: filter, operator } };
    },
    [types.REMOVE_FILTER](state, id) {
        delete state.filters[id];
        state.filters = { ...state.filters };
    },
    [types.REMOVE_FILTER_FOR_OPERATOR](state, { id, operator }) {
        delete state.advancedFilters[id][operator];
        state.advancedFilters[id] = { ...state.advancedFilters[id] };
        state.advancedFilters = { ...state.advancedFilters };
    },
    [types.SET_ADVANCED_FILTER_AT_INDEX](state, { index, filter }) {
        state.advancedFiltersData[index] = filter;
        state.advancedFiltersData = [...state.advancedFiltersData];
    },
    [types.SET_ADVANCED_FILTERS](state, advancedFiltersData) {
        state.advancedFiltersData = advancedFiltersData;
    },
    [types.SET_ADVANCED_FILTER](state, { id, operator, value }) {
        state.advancedFilters = { ...state.advancedFilters, [id]: { [operator]: value } };
        state.advancedFilters[id] = { ...state.advancedFilters[id] };
        state.advancedFilters = { ...state.advancedFilters };
    },
    [types.REMOVE_ALL_ADVANCED_FILTERS](state) {
        state.advancedFiltersData = [];
    },
    [types.CLEAR_ALL_ADVANCED_FILTERS]() {
        // state.advancedFiltersData = state.advancedFiltersData.map(
        //     (filter) => ({ ...filter, value: null }),
        // );
    },
    [types.REMOVE_ADVANCED_FILTER_AT_INDEX](state, index) {
        state.advancedFiltersData.splice(index, 1);
    },
    [types.SET_CURRENT_PAGE](state, payload) {
        state.currentPage = payload;
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
