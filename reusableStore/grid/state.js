/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = () => ({
    numberOfDisplayedElements: 25,
    columns: [],
    columnWidths: [],
    pinnedColumns: [],
    rowIds: [],
    cellValues: {},
    count: 0,
    filtered: 0,
    basicFilters: {},
    advancedFilters: [],
    displayedPage: 1,
    configuration: {},
    sortedByColumn: {},
    isSelectedAllRows: false,
    selectedRows: {},
    editingCellCoordinates: {},
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
