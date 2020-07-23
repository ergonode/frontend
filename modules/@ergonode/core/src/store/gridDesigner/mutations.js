/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    removeFromObjectByKey,
} from '@Core/models/objectWrapper';

export const types = {
    ADD_GRID_ITEM: 'ADD_GRID_ITEM',
    SET_ROWS_COUNT: 'SET_ROWS_COUNT',
    SET_GRID_DATA: 'SET_GRID_DATA',
    SET_FULL_GRID_DATA: 'SET_FULL_GRID_DATA',
    SET_GRID_ITEM: 'SET_GRID_ITEM',
    SET_HIDDEN_ITEM: 'SET_HIDDEN_ITEM',
    SET_EXPAND_ITEM: 'SET_EXPAND_ITEM',
    SET_CHILDREN_LENGTH: 'SET_CHILDREN_LENGTH',
    REMOVE_HIDDEN_ITEM: 'REMOVE_HIDDEN_ITEM',
};

export default {
    [types.ADD_GRID_ITEM](state, item) {
        state.gridData.push(item);
        state.gridData.sort((a, b) => a.row - b.row);
    },
    [types.SET_ROWS_COUNT](state, value) {
        state.rows = value;
    },
    [types.SET_GRID_DATA](state, value) {
        state.gridData = value;
    },
    [types.SET_FULL_GRID_DATA](state, value) {
        state.fullGridData = value;
    },
    [types.SET_GRID_ITEM](state, {
        index, item,
    }) {
        state.gridData[index] = item;
        state.gridData.sort((a, b) => a.row - b.row);
    },
    [types.SET_HIDDEN_ITEM](state, {
        key, value,
    }) {
        state.hiddenItems = {
            ...state.hiddenItems,
            [key]: value,
        };
    },
    [types.SET_EXPAND_ITEM](state, {
        index, value,
    }) {
        state.gridData[index] = {
            ...state.gridData[index],
            expanded: value,
        };
    },
    [types.SET_CHILDREN_LENGTH](state, {
        index, value,
    }) {
        state.gridData[index] = {
            ...state.gridData[index],
            children: value,
        };
    },
    [types.REMOVE_HIDDEN_ITEM](state, key) {
        state.hiddenItems = removeFromObjectByKey(state.hiddenItems, key);
    },
};
