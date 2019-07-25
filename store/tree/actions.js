/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import {
    rebuildTreeWhenElementRemoved,
    rebuildTreeWhenGhostElementRemoved,
    rebuildTreeWhenElementCollapse,
    rebuildTreeWhenElementExpand,
    rebuildFullTree,
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
                const treeToSet = getParsedTreeData(treeData, categories);
                commit(types.SET_TREE, treeToSet);
                commit(types.SET_FULL_TREE, treeToSet);
            }).catch(e => onError(e.data));
        }).catch(e => onError(e.data));
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
    addTreeItem: ({ commit, getters }, item) => {
        const findIndex = getters.getIndexById(item.id);
        if (findIndex >= 0) {
            commit(types.SET_TREE_ITEM, { index: findIndex, item });
        } else {
            commit(types.ADD_TREE_ITEM, item);
        }
    },
    removeTreeItem: ({ commit, state }, id) => {
        let newTree = [];
        if (Number.isInteger(id)) {
            newTree = rebuildTreeWhenElementRemoved(state.treeData, id);
            const newFullTree = rebuildFullTree(state.hiddenItems, newTree);
            commit(types.SET_FULL_TREE, newFullTree);
        } else {
            newTree = state.treeData.filter(el => el.id !== id);
        }
        commit(types.SET_TREE, newTree);
    },
    setTreeWhenCollapse: ({ commit, getters }, { tree, id }) => {
        const index = getters.getIndexById(id);
        const newTree = rebuildTreeWhenElementCollapse(tree, index);
        commit(types.SET_TREE, newTree);
    },
    setTreeWhenExpand: ({ commit, state, getters }, id) => {
        const index = getters.getIndexById(id);
        const newTree = rebuildTreeWhenElementExpand(state.hiddenItems[id], state.treeData, index);
        commit(types.SET_TREE, newTree);
    },
    rebuildTree: ({ commit, state, getters }, id) => {
        const index = getters.getIndexById(id);
        const newTree = rebuildTreeWhenGhostElementRemoved(state.treeData, index);
        const newFullTree = rebuildFullTree(state.hiddenItems, newTree);
        commit(types.SET_TREE, newTree);
        commit(types.SET_FULL_TREE, newFullTree);
    },
    setExpandItem: ({ commit, getters }, { id, value }) => {
        const index = getters.getIndexById(id);
        commit(types.SET_EXPAND_ITEM, { index, value });
    },
    setChildrenLength: ({ commit, state, getters }, { id, value }) => {
        const index = getters.getIndexById(id);
        const { children } = state.treeData[index];
        commit(types.SET_CHILDREN_LENGTH, { index, value: children + value });
    },
    setHiddenItem: ({ commit }, { key, value }) => {
        commit(types.SET_HIDDEN_ITEM, { key, value });
    },
    removeHiddenItem: ({ commit }, key) => {
        commit(types.REMOVE_HIDDEN_ITEM, key);
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STORAGE),
};
