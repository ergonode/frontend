/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedGridConfiguration,
    getMappedColumns,
    getMappedColumnWidth,
    getSortedColumnsByIDs,
    getMappedFilter,
} from '~/model/mappers/gridDataMapper';
import { swapItemPosition } from '~/model/arrayWrapper';

export default {
    getData({ commit, state }, { path }) {
        const {
            columns: stateColumns,
            sortedByColumn,
            displayedPage,
            numberOfDisplayedElements,
            filter,
        } = state;
        const parsedFilter = getMappedFilter(filter);
        const params = {};
        const isProductGrid = path.includes('products');
        const columnsID = isProductGrid
            ? this.$cookies.get('columnsID') || stateColumns.map(col => col.id).join(',')
            : null;

        if (Object.keys(sortedByColumn).length) {
            const { index, orderState } = sortedByColumn;

            params.field = index;
            params.order = orderState;
        }

        if (parsedFilter) {
            params.filter = parsedFilter;
        }

        params.limit = numberOfDisplayedElements;
        params.offset = (displayedPage - 1) * numberOfDisplayedElements;
        params.columns = columnsID;

        return this.app.$axios.$get(path, { params }).then(({
            configuration, collection: rows, columns, count, filtered,
        }) => {
            let mappedColumns = [];
            if (columnsID) {
                const sortedColumns = getSortedColumnsByIDs(columns, columnsID);
                mappedColumns = getMappedColumns(
                    sortedColumns.filter(col => col.visible),
                );
            } else {
                mappedColumns = getMappedColumns(
                    columns.filter(col => col.visible),
                );
            }
            const mappedConfiguration = getMappedGridConfiguration(configuration);

            commit('setConfiguration', mappedConfiguration);
            commit('setRows', rows);
            commit('setCount', count);
            commit('setFiltered', filtered);
            commit('setColumns', { columns: mappedColumns });
        }).catch(e => console.log(e));
    },
    getColumnData({ commit, state }, {
        index,
        columnId,
        path,
    }) {
        const {
            columns: stateColumns, displayedPage, numberOfDisplayedElements, sortedByColumn, filter,
        } = state;
        const stateColumnsID = stateColumns.map(col => col.id).filter(id => !(id.includes('extender') || id.includes('ghost')));
        const parsedColumnsID = [
            ...stateColumnsID.slice(0, index),
            columnId,
            ...stateColumnsID.slice(index),
        ].join(',');
        const parsedFilter = getMappedFilter(filter);

        const params = {
            columns: parsedColumnsID,
            offset: (displayedPage - 1) * numberOfDisplayedElements,
            limit: numberOfDisplayedElements,
        };

        if (Object.keys(sortedByColumn).length) {
            const { index: colSortID, orderState } = sortedByColumn;

            params.field = colSortID;
            params.order = orderState;
        }

        if (parsedFilter) {
            params.filter = parsedFilter;
        }

        return this.app.$axios.$get(path, { params }).then(({
            collection, columns,
        }) => {
            const [columnToInsert] = columns.filter(col => col.id === columnId);

            this.$cookies.set('columnsID', parsedColumnsID);

            columnToInsert.width = getMappedColumnWidth(columnToInsert);

            commit('insertColumnAtIndex', { column: columnToInsert, index });
            commit('setRows', collection);
        }).catch(e => console.log(e));
    },
    setFilter: ({ commit, state }, { filter, id }) => {
        // Remove selection on filter action
        commit('removeSelectedRows');
        commit('setSelectionForAllRows', { isSelected: false });

        if (!state.filter[id] && !filter) {
            return;
        }

        if ((filter === '' && state.filter[id])
            || (filter.length === 0)) {
            commit('deleteFilter', { filter, id });
        } else {
            commit('setFilter', { filter, id });
        }
    },
    setSortingState: ({ commit }, sortedColumn = {}) => {
        commit('setSortingState', sortedColumn);
    },
    changeNumberOfDisplayingElements: ({ commit, state }, { number }) => {
        commit('setNumberOfDisplayingElements', { number });
        const { numberOfDisplayedElements, filtered, displayedPage } = state;

        if (numberOfDisplayedElements > filtered) {
            // We have only 1 page!
            commit('setDisplayingPage', 1);
        } else {
            const page = Math.floor(filtered / numberOfDisplayedElements);
            commit('setDisplayingPage', Math.min(page, displayedPage));
        }
    },
    changeDisplayingPage: ({ commit }, { number }) => commit('setDisplayingPage', number),
    insertColumnAtIndex: ({ commit }, { column, index }) => {
        commit('insertColumnAtIndex', { column, index });
    },
    removeColumnAtIndex: ({ commit }, { index }) => {
        commit('removeColumnAtIndex', { index });
    },
    changeColumnPosition: ({ commit, state }, { from, to }) => {
        const { columns } = state;
        const newOrderedColumns = [...swapItemPosition(columns, from, to)];

        commit('setColumns', { columns: newOrderedColumns });
    },
    setEditingCellCoordinates: ({ commit }, editingCellCoordinates = {}) => commit('setEditingCellCoordinates', editingCellCoordinates),
    setSelectionForAllRows: ({ commit, state }, { isSelected }) => {
        const { selectedRows } = state;

        if (Object.entries(selectedRows).length) {
            commit('removeSelectedRows');
        } else {
            commit('setSelectionForAllRows', { isSelected });
        }
    },
    setSelectedRow: ({ commit, state }, { row, value }) => {
        if (value) {
            commit('setSelectedRow', { row });
        } else {
            const { isSelectedAllRows, filtered } = state;

            commit('removeSelectedRow', { row });

            if (isSelectedAllRows) {
                // If we had chosen option with selected all of the options, we need to remove it
                // and mark visible rows as selected
                // +2 because we have 2 rows marked as a header and filter

                const rowsToSelect = {};

                for (let i = 2; i < filtered + 2; i += 1) {
                    if (i !== row) {
                        rowsToSelect[i] = true;
                    }
                }

                commit('setSelectedRows', { rows: rowsToSelect });
                commit('setSelectionForAllRows', { isSelected: false });
            }
        }
    },
    addDraftToProduct: ({ commit, state }, { draft, productId }) => {
        const { rows } = state;
        const draftKeys = Object.keys(draft);
        const productIndex = rows.findIndex(row => row.id === productId);

        if (productIndex !== -1) {
            draftKeys.forEach((key) => {
                if (rows[productIndex][key] !== undefined) {
                    const productToAdd = { ...rows[productIndex], [key]: draft[key] };

                    commit('addDraftToProductAtIndex', { index: productIndex, product: productToAdd });
                }
            });
        }
    },
    clearStorage: ({ commit }) => commit('clearStorage'),
};
