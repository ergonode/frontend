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
    rowLinks: [],
    cellValues: {},
    count: 0,
    filtered: 0,
    filters: {},
    advancedFilters: {},
    advancedFiltersData: [],
    currentPage: 1,
    sortedByColumn: {},
    editingCellCoordinates: {},
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
