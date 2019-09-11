/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';
import { removeFromObjectByKey } from '~/model/objectWrapper';

export const types = {
    ADD_TREE_ITEM: 'ADD_TREE_ITEM',
    SET_ROWS_COUNT: 'SET_ROWS_COUNT',
    SET_TREE_ID: 'SET_TREE_ID',
    SET_CODE: 'SET_CODE',
    SET_TREE: 'SET_TREE',
    SET_FULL_TREE: 'SET_FULL_TREE',
    SET_TREE_ITEM: 'SET_TREE_ITEM',
    SET_HIDDEN_ITEM: 'SET_HIDDEN_ITEM',
    SET_EXPAND_ITEM: 'SET_EXPAND_ITEM',
    SET_CHILDREN_LENGTH: 'SET_CHILDREN_LENGTH',
    REMOVE_HIDDEN_ITEM: 'REMOVE_HIDDEN_ITEM',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.ADD_TREE_ITEM](state, item) {
        state.treeData.push(item);
        state.treeData.sort((a, b) => a.row - b.row);
    },
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
    [types.SET_CODE](state, value) {
        state.code = value;
    },
    [types.SET_TREE_ITEM](state, { index, item }) {
        state.treeData[index] = item;
        state.treeData.sort((a, b) => a.row - b.row);
    },
    [types.SET_HIDDEN_ITEM](state, { key, value }) {
        state.hiddenItems = { ...state.hiddenItems, [key]: value };
    },
    [types.SET_EXPAND_ITEM](state, { index, value }) {
        state.treeData[index] = { ...state.treeData[index], expanded: value };
    },
    [types.SET_CHILDREN_LENGTH](state, { index, value }) {
        state.treeData[index] = { ...state.treeData[index], children: value };
    },
    [types.REMOVE_HIDDEN_ITEM](state, key) {
        state.hiddenItems = removeFromObjectByKey(state.hiddenItems, key);
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
