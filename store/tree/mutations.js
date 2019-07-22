/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';
import { removeFromObjectByKey } from '~/model/objectWrapper';

export const types = {
    SET_ROWS_COUNT: 'SET_ROWS_COUNT',
    SET_TREE_ID: 'SET_TREE_ID',
    SET_TREE: 'SET_TREE',
    SET_FULL_TREE: 'SET_FULL_TREE',
    ADD_TREE_ITEM: 'ADD_TREE_ITEM',
    SET_TREE_ITEM: 'SET_TREE_ITEM',
    SET_HIDDEN_ITEM: 'SET_HIDDEN_ITEM',
    REMOVE_HIDDEN_ITEM: 'REMOVE_HIDDEN_ITEM',
    CLEAR_STORAGE: 'CLEAR_STORAGE',
};

export default {
    [types.SET_ROWS_COUNT](state, value) {
        state.rowsCount = value;
    },
    [types.SET_TREE](state, value) {
        state.treeData = value;
    },
    [types.SET_FULL_TREE](state, value) {
        state.fullTreeData = value;
    },
    [types.SET_TREE_ID](state, value) {
        state.treeId = value;
    },
    [types.ADD_TREE_ITEM](state, item) {
        state.treeData.push(item);
        state.treeData.sort((a, b) => a.row - b.row);
    },
    [types.SET_TREE_ITEM](state, { index, item }) {
        state.treeData[index] = item;
        state.treeData.sort((a, b) => a.row - b.row);
    },
    [types.SET_HIDDEN_ITEM](state, { key, value }) {
        state.hiddenItems = { ...state.hiddenItems, [key]: value };
    },
    [types.REMOVE_HIDDEN_ITEM](state, key) {
        state.hiddenItems = removeFromObjectByKey(state.hiddenItems, key);
    },
    [types.CLEAR_STORAGE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
