/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { removeFromObjectByKey } from '~/model/objectWrapper';

export default {
    setRowsCount: (state, value) => {
        state.rowsCount = value;
    },
    setTree: (state, value) => {
        state.treeData = value;
    },
    addTreeItem: (state, item) => {
        state.treeData.push(item);
        state.treeData.sort((a, b) => a.row - b.row);
    },
    setTreeItem: (state, { index, item }) => {
        state.treeData[index] = item;
        state.treeData.sort((a, b) => a.row - b.row);
    },
    removeTreeItem: (state, id) => {
        state.treeData = state.treeData.filter(el => el.id !== id);
    },
    rebuildTree: (state, { tree }) => {
        state.treeData = tree;
    },
    setHiddenItem: (state, { key, value }) => {
        state.hiddenItems = { ...state.hiddenItems, [key]: value };
    },
    removeHiddenItem: (state, key) => {
        state.hiddenItems = removeFromObjectByKey(state.hiddenItems, key);
    },
    clearStorage: (state) => {
        state.treeLevels = 5;
        state.rowsHeight = 50;
        state.rowsCount = 0;
        state.treeData = [];
        state.hiddenItems = {};
    },
};
