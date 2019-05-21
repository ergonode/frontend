/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { removeFromObjectByKey } from '~/model/objectWrapper';

export default {
    setState: (state, { key, value }) => {
        state[key] = value;
    },
    addTreeItem: (state, { item }) => {
        state.treeData.push(item);
        state.treeData.sort((a, b) => a.row - b.row);
    },
    setTreeItem: (state, { index, item }) => {
        state.treeData[index] = item;
        state.treeData.sort((a, b) => a.row - b.row);
    },
    removeTreeItem: (state, { index }) => {
        state.treeData.splice(index, 1);
    },
    rebuildTree: (state, { tree }) => {
        state.treeData = tree;
    },
    setHiddenItem: (state, { key, value }) => {
        state.hiddenItems = { ...state.hiddenItems, [key]: value };
        // state.hiddenItems[key] = value;
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
