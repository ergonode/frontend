/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { DATA_LIMIT } from '~/defaults/grid';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = () => ({
    numberOfDisplayedElements: DATA_LIMIT,
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
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
