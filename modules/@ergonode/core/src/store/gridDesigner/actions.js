/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getFullTree,
    getTreeWhenElementExpand,
    getTreeWhenElementRemoved,
} from '@Core/models/template_grid/TreeCalculations';

import {
    types,
} from './mutations';

export default {
    setGridData: ({
        commit,
    }, data) => {
        commit(types.SET_DATA, data);
    },
    setFullGridData: ({
        commit, state,
    }, data) => {
        const newFullGridData = getFullTree(state.hiddenItems, data);

        commit(types.SET_FULL_GRID_DATA, newFullGridData);
    },
    setGridWhenExpand: ({
        commit, state,
    }, {
        id, index,
    }) => {
        const newGrid = getTreeWhenElementExpand(state.hiddenItems[id], state.gridData, index);

        commit(types.SET_DATA, newGrid);
    },
    setExpandItem: ({
        commit,
    }, {
        index,
        value,
    }) => {
        commit(types.SET_EXPAND_ITEM, {
            index,
            value,
        });
    },
    setChildrenLength: ({
        commit, state, getters,
    }, {
        id, value,
    }) => {
        if (id !== 'root') {
            const index = getters.getIndex(id);
            const {
                children,
            } = state.gridData[index];

            commit(types.SET_CHILDREN_LENGTH, {
                index,
                value: children + value,
            });
        }
    },
    removeItems({
        commit,
    }, payload) {
        commit(types.REMOVE_GRID_ITEMS, payload);
    },
    setHiddenItem: ({
        commit,
    }, {
        key,
        value,
    }) => {
        commit(types.SET_HIDDEN_ITEM, {
            key,
            value,
        });
    },
    removeItemAtIndex({
        commit,
    }, payload) {
        commit(types.REMOVE_GRID_ITEM, payload);
    },
    insertItemsSince({
        commit,
    }, payload) {
        commit(types.INSERT_ITEMS, payload);
    },
    shiftItems({
        commit,
    }, payload) {
        commit(types.SHIFT_ITEMS, payload);
    },
    setItemAtIndex({
        commit,
    }, payload) {
        commit(types.SET_ITEM, payload);
    },
    addItem({
        commit,
    }, payload) {
        commit(types.ADD_ITEM, payload);
    },
    swapItemsPosition({
        commit,
    }, payload) {
        commit(types.SWAP_ITEMS, payload);
    },
    insertItemAtIndex({
        commit,
    }, payload) {
        commit(types.INSERT_ITEM, payload);
    },
    removeGridItem: ({
        state, dispatch,
    }, id) => {
        let newGrid = [];

        if (Number.isInteger(id)) {
            newGrid = getTreeWhenElementRemoved(state.gridData, id);
            dispatch('setFullGridData', newGrid);
        } else {
            newGrid = state.gridData.filter(el => el.id !== id);
        }
        dispatch('setGridData', newGrid);
    },
    removeHiddenItem: ({
        commit,
    }, key) => {
        commit(types.REMOVE_HIDDEN_ITEM, key);
    },
};
