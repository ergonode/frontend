/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getTreeWhenElementRemoved,
    getTreeWhenGhostElementRemoved,
    getTreeWhenElementCollapse,
    getTreeWhenElementExpand,
    getFullTree,
} from '@Core/models/template_grid/TreeCalculations';
import { types } from './mutations';

export default {
    setRowsCount: ({ commit }, value) => {
        commit(types.SET_ROWS_COUNT, value);
    },
    setGridData: ({ commit }, data) => {
        commit(types.SET_GRID_DATA, data);
    },
    setFullGridData: ({ commit, state }, data) => {
        const newFullGridData = getFullTree(state.hiddenItems, data);

        commit(types.SET_FULL_GRID_DATA, newFullGridData);
    },
    setGridWhenCollapse: ({ commit }, { data, index }) => {
        const newGrid = getTreeWhenElementCollapse(data, index);

        commit(types.SET_GRID_DATA, newGrid);
    },
    setGridWhenExpand: ({ commit, state }, { id, index }) => {
        const newGrid = getTreeWhenElementExpand(state.hiddenItems[id], state.gridData, index);

        commit(types.SET_GRID_DATA, newGrid);
    },
    setExpandItem: ({ commit }, { index, value }) => {
        commit(types.SET_EXPAND_ITEM, { index, value });
    },
    setChildrenLength: ({ commit, state, getters }, { id, value }) => {
        if (id !== 'root') {
            const index = getters.getIndexById(id);
            const { children } = state.gridData[index];

            commit(types.SET_CHILDREN_LENGTH, { index, value: children + value });
        }
    },
    setHiddenItem: ({ commit }, { key, value }) => {
        commit(types.SET_HIDDEN_ITEM, { key, value });
    },
    addGridItem: ({ commit, getters }, item) => {
        const findIndex = getters.getIndexById(item.id);

        if (findIndex >= 0) {
            commit(types.SET_GRID_ITEM, { index: findIndex, item });
        } else {
            commit(types.ADD_GRID_ITEM, item);
        }
    },
    rebuildGridById: ({
        state, getters, dispatch,
    }, id) => {
        const index = getters.getIndexById(id);
        const newGrid = getTreeWhenGhostElementRemoved(state.gridData, index);

        dispatch('setGridData', newGrid);
        dispatch('setFullGridData', newGrid);
    },
    removeGridItem: ({ state, dispatch }, id) => {
        let newGrid = [];

        if (Number.isInteger(id)) {
            newGrid = getTreeWhenElementRemoved(state.gridData, id);
            dispatch('setFullGridData', newGrid);
        } else {
            newGrid = state.gridData.filter(el => el.id !== id);
        }
        dispatch('setGridData', newGrid);
    },
    removeHiddenItem: ({ commit }, key) => {
        commit(types.REMOVE_HIDDEN_ITEM, key);
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STATE),
};
