/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    insertValueAtIndex,
    insertValuesAtIndex,
    removeArrayIndexes,
} from '@Core/models/arrayWrapper';
import {
    removeObjectProperty,
} from '@Core/models/objectWrapper';

export const types = {
    ADD_ITEM: 'ADD_ITEM',
    INSERT_ITEMS: 'INSERT_ITEMS',
    SET_DATA: 'SET_DATA',
    SET_FULL_GRID_DATA: 'SET_FULL_GRID_DATA',
    SET_ITEM: 'SET_ITEM',
    SWAP_ITEMS: 'SWAP_ITEMS',
    REMOVE_GRID_ITEM: 'REMOVE_GRID_ITEM',
    SHIFT_ITEMS: 'SHIFT_ITEMS',
    REMOVE_GRID_ITEMS: 'REMOVE_GRID_ITEMS',
    SWAP_GRID_ITEMS: 'SWAP_GRID_ITEMS',
    UPDATE_GRID_ITEM: 'UPDATE_GRID_ITEM',
    INSERT_ITEM: 'INSERT_ITEM',
    SET_HIDDEN_ITEM: 'SET_HIDDEN_ITEM',
    SET_EXPAND_ITEM: 'SET_EXPAND_ITEM',
    SET_CHILDREN_LENGTH: 'SET_CHILDREN_LENGTH',
    REMOVE_HIDDEN_ITEM: 'REMOVE_HIDDEN_ITEM',
};

export default {
    [types.INSERT_ITEMS](state, {
        items,
        since,
    }) {
        state.gridData = insertValuesAtIndex(state.gridData, items, since);
    },
    [types.ADD_ITEM](state, item) {
        state.gridData.push(item);
    },
    [types.SET_DATA](state, value) {
        state.gridData = value;
    },
    [types.SET_FULL_GRID_DATA](state, value) {
        state.fullGridData = value;
    },
    [types.REMOVE_GRID_ITEM](state, index) {
        state.gridData.splice(index, 1);
    },
    [types.SWAP_ITEMS](state, {
        since,
        till,
        ghostShiftRow,
        ghostColumn,
        shiftRow,
        parentId,
    }) {
        for (let i = since; i <= till; i += 1) {
            if (state.gridData[i].id === 'ghost_item') {
                state.gridData[i].row += ghostShiftRow;
                state.gridData[i].column = ghostColumn;
                state.gridData[i].parent = parentId;
            } else {
                state.gridData[i].row += shiftRow;
            }
        }

        state.gridData = state.gridData.sort((a, b) => a.row - b.row);
    },
    [types.SHIFT_ITEMS](state, {
        since,
        value,
    }) {
        for (let i = since + 1; i < state.gridData.length; i += 1) {
            state.gridData[i].row += value;
        }
    },
    [types.REMOVE_GRID_ITEMS](state, indexes) {
        state.gridData = removeArrayIndexes(state.gridData, indexes);
    },
    [types.SET_ITEM](state, {
        index,
        item,
    }) {
        state.gridData[index] = item;
        state.gridData = [
            ...state.gridData,
        ];
    },
    [types.INSERT_ITEM](state, {
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
