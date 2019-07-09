/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import treeData from '~/model/tree/treeData';
import {
    rebuildTreeWhenElementRemoved,
    rebuildTreeWhenGhostElementRemoved,
} from '~/model/tree/TreeCalculations';

export default {
    setRowsCount: ({ commit }, value) => {
        commit(types.SET_ROWS_COUNT, value);
    },
    getTreeById(
        { commit, rootState },
        { treeId, onError },
    ) {
        const sortedData = treeData.sort((a, b) => a.row - b.row);
        commit(types.SET_TREE, sortedData);
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/trees/${treeId}`).then(() => {
            // TODO: uncomment when we have date from API
            // commit(types.SET_TREE, response.data);
        }).catch(e => onError(e.data));
    },
    addTreeItem: ({ commit, state }, item) => {
        const findIndex = state.treeData.findIndex(el => el.id === item.id);
        if (findIndex >= 0) {
            commit(types.SET_TREE_ITEM, { index: findIndex, item });
        } else {
            commit(types.ADD_TREE_ITEM, item);
        }
    },
    removeTreeItem: ({ commit, state }, id) => {
        commit(types.REMOVE_TREE_ITEM, id);
        if (Number.isInteger(id)) {
            const newTree = rebuildTreeWhenElementRemoved(state.treeData, id);
            commit(types.REBUILD_TREE, { tree: newTree });
        }
    },
    rebuildTree: ({ commit, state }, id) => {
        const findIndex = state.treeData.findIndex(el => el.id === id);
        const newTree = rebuildTreeWhenGhostElementRemoved(state.treeData, findIndex);
        commit(types.REBUILD_TREE, { tree: newTree });
    },
    setHiddenItem: ({ commit }, { key, value }) => {
        commit(types.SET_HIDDEN_ITEM, { key, value });
    },
    removeHiddenItem: ({ commit }, key) => {
        commit(types.REMOVE_HIDDEN_ITEM, key);
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STORAGE),
};
