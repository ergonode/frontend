/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    insertValueAtIndex,
} from '@Core/models/arrayWrapper';
import {
    removeObjectProperty,
} from '@Core/models/objectWrapper';

export const types = {
    ADD_GRID_ITEM: 'ADD_GRID_ITEM',
    SET_ROWS_COUNT: 'SET_ROWS_COUNT',
    SET_GRID_DATA: 'SET_GRID_DATA',
    SET_FULL_GRID_DATA: 'SET_FULL_GRID_DATA',
    SET_GRID_ITEM: 'SET_GRID_ITEM',
    REMOVE_GRID_ITEM: 'REMOVE_GRID_ITEM',
    SHIFT_GRID_ITEMS: 'SHIFT_GRID_ITEMS',
    SWAP_GRID_ITEMS: 'SWAP_GRID_ITEMS',
    UPDATE_GRID_ITEM: 'UPDATE_GRID_ITEM',
    INSERT_GRID_ITEM: 'INSERT_GRID_ITEM',
    SET_HIDDEN_ITEM: 'SET_HIDDEN_ITEM',
    SET_EXPAND_ITEM: 'SET_EXPAND_ITEM',
    SET_CHILDREN_LENGTH: 'SET_CHILDREN_LENGTH',
    REMOVE_HIDDEN_ITEM: 'REMOVE_HIDDEN_ITEM',
};

export default {
    [types.ADD_GRID_ITEM](state, item) {
        state.gridData.push(item);
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
    [types.REMOVE_GRID_ITEM](state, index) {
        state.gridData.splice(index, 1);
    },
    [types.SHIFT_GRID_ITEMS](state, {
        since,
        value,
    }) {
        for (let i = since + 1; i < state.gridData.length; i += 1) {
            state.gridData[i].row += value;
        }
    },
    [types.SET_GRID_ITEM](state, {
        index,
        item,
    }) {
        state.gridData[index] = item;
        state.gridData = [
            ...state.gridData,
        ];
    },
    [types.INSERT_GRID_ITEM](state, {
        index,
        item,
    }) {
        state.gridData = insertValueAtIndex(state.gridData, item, index);
    },
    [types.SET_HIDDEN_ITEM](state, {
        key,
        value,
    }) {
        state.hiddenItems = {
            ...state.hiddenItems,
            [key]: value,
        };
    },
    [types.SET_EXPAND_ITEM](state, {
        index,
        value,
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
        state.hiddenItems = removeObjectProperty(state.hiddenItems, key);
    },
};
