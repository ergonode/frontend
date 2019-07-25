/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import {
    rebuildTreeWhenElementRemoved,
    rebuildTreeWhenGhostElementRemoved,
} from '~/model/tree/TreeCalculations';
import { getParsedTreeData } from '~/model/mappers/treeMapper';

export default {
    setRowsCount: ({ commit }, value) => {
        commit(types.SET_ROWS_COUNT, value);
    },
    setTree: ({ commit }, tree) => {
        commit(types.SET_TREE, tree);
    },
    getTreeById(
        { commit, rootState },
        { treeName, onError },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { [userLanguageCode]: categories } = rootState.list.elements;
        return this.app.$axios.$get(`${userLanguageCode}/trees`).then(({ collection }) => {
            const treeId = collection.find(e => e.name.toLowerCase() === treeName.toLowerCase()).id;
            commit(types.SET_TREE_ID, treeId);
            return this.app.$axios.$get(`${userLanguageCode}/trees/${treeId}`).then(({ categories: treeData }) => {
                commit(types.SET_TREE, getParsedTreeData(treeData, categories));
            }).catch((e) => {
                console.log(e);
                onError(e);
            });
        }).catch((e) => {
            console.log(e);
            onError(e);
        });
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
    updateTree(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/trees/${id}`, data).then(() => {
            onSuccess();
        }).catch(e => onError(e.data));
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STORAGE),
};
