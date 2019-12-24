/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedCellValues,
    getMappedRowIds,
    getMappedRowLinks,
    getMappedColumn,
    getMappedColumns,
    getSortedColumnsByIDs,
    getParsedRequestDataParams,
} from '~/model/mappers/gridDataMapper';
import { swapItemPosition, insertValueAtIndex } from '~/model/arrayWrapper';
import { COLUMNS_IDS, ADV_FILTERS_IDS } from '~/defaults/grid/cookies';
import { types } from './mutations';
import { GHOST_ID } from '~/defaults/grid';

export default {
    getData({ commit, state }, path) {
        const {
            columns: stateColumns,
            columnWidths: stateColumnWidths,
        } = state;
        const isProductGrid = path.includes('products') && !path.includes('history');
        const columnIDs = isProductGrid
            ? this.$cookies.get(COLUMNS_IDS) || stateColumns.map((col) => col.id).join(',')
            : null;
        const params = getParsedRequestDataParams(state, columnIDs);

        return this.app.$axios.$get(path, { params }).then(({
            collection: rows, columns, info,
        }) => {
            const { count, filtered } = info;
            const columnsToMap = columnIDs ? getSortedColumnsByIDs([...columns], columnIDs, 'id') : columns;
            const visibleColumns = columnsToMap.filter((col) => col.visible);
            const { mappedColumns, pinnedColumns, columnWidths } = getMappedColumns(visibleColumns);
            const rowIds = getMappedRowIds(rows);
            const rowLinks = getMappedRowLinks(rows);
            const cellValues = getMappedCellValues(columns, rows, rowIds);

            if (isProductGrid) {
                this.$cookies.set(COLUMNS_IDS, visibleColumns.map((col) => col.id).join(','));
            }

            if (!stateColumnWidths.length) commit(types.SET_COLUMN_WIDTHS, columnWidths);

            commit(types.SET_CELL_VALUES, cellValues);
            commit(types.SET_ROW_IDS, rowIds);
            commit(types.SET_ROW_LINKS, rowLinks);
            commit(types.SET_COUNT, count);
            commit(types.SET_FILTERED, filtered);
            commit(types.SET_COLUMNS, mappedColumns);
            commit(types.SET_PINNED_COLUMNS, pinnedColumns);
        });
    },
    getColumnData({ commit, dispatch, state }, {
        ghostIndex,
        columnId,
        path,
    }) {
        const {
            columns: stateColumns,
            columnWidths: stateColumnWidths,
            advancedFiltersData,
        } = state;
        const stateColumnsID = stateColumns
            .filter((col) => !col.id.includes(GHOST_ID))
            .map((col) => col.id);
        const columnIDs = insertValueAtIndex(stateColumnsID, columnId, ghostIndex).join(',');
        const params = getParsedRequestDataParams(state, columnIDs);

        return this.app.$axios.$get(path, { params }).then(({
            collection: rows, columns,
        }) => {
            this.$cookies.set(COLUMNS_IDS, columnIDs);

            const draggedColumn = columns.find((col) => col.id === columnId);
            const { mappedColumn, columnWidth } = getMappedColumn(draggedColumn);
            const rowIds = getMappedRowIds(rows);
            const rowLinks = getMappedRowLinks(rows);
            const cellValues = getMappedCellValues(columns, rows, rowIds);
            const newColumnsWidth = insertValueAtIndex(
                stateColumnWidths, columnWidth, ghostIndex,
            );
            const newColumns = insertValueAtIndex(
                stateColumns, mappedColumn, ghostIndex,
            );
            const advcFilterIndex = advancedFiltersData
                .findIndex((f) => f.element_id === draggedColumn.element_id);

            dispatch('list/setDisabledElement', { languageCode: draggedColumn.language, elementId: draggedColumn.element_id, disabled: advcFilterIndex !== -1 }, { root: true });

            commit(types.SET_COLUMNS, newColumns);
            commit(types.SET_COLUMN_WIDTHS, newColumnsWidth);
            commit(types.SET_CELL_VALUES, cellValues);
            commit(types.SET_ROW_IDS, rowIds);
            commit(types.SET_ROW_LINKS, rowLinks);
        });
    },
    getAdvancedFiltersData({ commit, rootState }) {
        const columnIds = this.$cookies.get(ADV_FILTERS_IDS);

        if (columnIds) {
            const { language: userLanguageCode } = rootState.authentication.user;
            const params = {
                limit: 999999,
                offset: 0,
                columns: columnIds,
            };

            return this.$axios.$get(`${userLanguageCode}/products`, { params }).then(({ columns }) => {
                commit(types.SET_ADVANCED_FILTERS, columns);
            });
        }

        return null;
    },
    setGridData({ commit }, { columns, rows }) {
        const { mappedColumns } = getMappedColumns(columns);
        const rowIds = getMappedRowIds(rows);
        const cellValues = getMappedCellValues(columns, rows, rowIds);

        commit(types.SET_COLUMNS, mappedColumns);
        commit(types.SET_CELL_VALUES, cellValues);
        commit(types.SET_ROW_IDS, rowIds);
    },
    setFilter({ commit }, { filter, id, operator }) {
        if (!filter || !filter.length) {
            commit(types.REMOVE_FILTER, id);
        } else {
            commit(types.SET_FILTER, { id, filter, operator });
        }
    },
    setAdvancedFilterValue({ commit }, { value, id, operator }) {
        if (!value.length) {
            commit(types.REMOVE_ADVANCED_FILTER_OPERATOR, { id, operator });
        } else {
            commit(types.SET_ADVANCED_FILTER_VALUE, { id, value, operator });
        }
    },
    setAdvancedFilterEmptyRecord({ commit, state }, { id, isEmptyRecord }) {
        if (state.advancedFilters[id] && !isEmptyRecord) {
            commit(types.REMOVE_ADVANCED_FILTER_EMPTY_RECORD, id);
        } else {
            commit(types.SET_ADVANCED_FILTER_EMPTY_RECORD, { id, isEmptyRecord });
        }
    },
    removeAdvancedFilter({ commit }, id) {
        commit(types.REMOVE_ADVANCED_FILTER, id);
    },
    setAdvancedFilterAtIndex({ commit }, payload) {
        commit(types.SET_ADVANCED_FILTER_AT_INDEX, payload);
    },
    insertAdvancedFilterAtIndex({ commit }, { index, filter }) {
        commit(types.INSERT_ADVANCED_FILTER_AT_INDEX, { index, filter });
    },
    removeAllAdvancedFilters({ commit }) {
        commit(types.REMOVE_ALL_ADVANCED_FILTERS);
    },
    clearAllAdvancedFilters({ commit }) {
        commit(types.CLEAR_ALL_ADVANCED_FILTERS);
    },
    removeAdvancedFilterAtIndex({ commit }, index) {
        commit(types.REMOVE_ADVANCED_FILTER_AT_INDEX, index);
    },
    setColumnWidths({ commit }, columnWidths) {
        commit(types.SET_COLUMN_WIDTHS, columnWidths);
    },
    setSortingState({ commit }, sortedColumn = {}) {
        commit(types.SET_SORTING_STATE, sortedColumn);
    },
    changeNumberOfDisplayingElements({ commit, state }, number) {
        commit(types.SET_NUMBER_OF_ELEMENTS_TO_DISPLAY, number);

        const { numberOfDisplayedElements, filtered, currentPage } = state;

        if (numberOfDisplayedElements > filtered) {
            // We have only 1 page!
            commit(types.SET_CURRENT_PAGE, 1);
        } else {
            const page = Math.floor(filtered / numberOfDisplayedElements);
            commit(types.SET_CURRENT_PAGE, Math.min(page, currentPage));
        }
    },
    updateColumnWidthAtIndex({ commit }, payload) {
        commit(types.SET_COLUMN_WIDTH_AT_INDEX, payload);
    },
    insertColumnWidthAtIndex({ commit }, payload) {
        commit(types.INSERT_COLUMN_WIDTH_AT_INDEX, payload);
    },
    setCurrentPage({ commit }, page) {
        commit(types.SET_CURRENT_PAGE, page);
    },
    insertColumnAtIndex({ commit }, { column, index }) {
        commit(types.INSERT_COLUMN_AT_INDEX, { column, index });
    },
    removeColumnAtIndex({ commit }, index) {
        commit(types.REMOVE_COLUMN_AT_INDEX, index);
    },
    removeColumnWidthAtIndex({ commit }, index) {
        commit(types.REMOVE_COLUMN_WIDTH_AT_INDEX, index);
    },
    changeFiltersPosition({ commit, state }, { from, to }) {
        const { advancedFiltersData } = state;
        const newOrderedFilters = [
            ...swapItemPosition(advancedFiltersData, from, to),
        ];

        commit(types.SET_ADVANCED_FILTERS, newOrderedFilters);
    },
    changeColumnPosition({ commit, state }, { from, to }) {
        const { columns } = state;
        const newOrderedColumns = [
            ...swapItemPosition(columns, from, to),
        ];

        this.$cookies.set(COLUMNS_IDS, newOrderedColumns.map((column) => column.id).join(','));

        commit(types.SET_COLUMNS, newOrderedColumns);
    },
    changeColumnWidthPosition({ commit, state }, { from, to }) {
        const { columnWidths } = state;
        const newOrderedColumnWidths = [
            ...swapItemPosition(columnWidths, from, to),
        ];

        commit(types.SET_COLUMN_WIDTHS, newOrderedColumnWidths);
    },
    setEditingCellCoordinates({ commit }, editingCellCoordinates = {}) {
        commit(types.SET_EDITING_CELL_COORDINATES, editingCellCoordinates);
    },
    addDraftToProduct({ commit }, { columnId, productId, value }) {
        const parsedValue = !Array.isArray(value) && typeof value !== 'object' ? { value } : value;

        commit(types.ADD_PRODUCT_VALUE, {
            productId,
            columnId,
            value: parsedValue,
        });
    },
    updateDataCellValue({ commit }, payload) {
        commit(types.UPDATE_DATA_CELL_VALUE, payload);
    },
};
