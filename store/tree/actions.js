/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import {
    getTreeWhenElementRemoved,
    getTreeWhenGhostElementRemoved,
    getTreeWhenElementCollapse,
    getTreeWhenElementExpand,
    getFullTree,
} from '~/model/tree/TreeCalculations';
import { getParsedTreeData } from '~/model/mappers/treeMapper';

const onDefaultError = () => {};

export default {
    getTreeById(
        { commit, rootState },
        { treeName },
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
            }).catch(onDefaultError);
        }).catch(onDefaultError);
    },
    updateTree(
        { rootState },
        {
            id, data, onSuccess,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/trees/${id}`, data).then(() => {
            onSuccess();
        }).catch(onDefaultError);
    },
    setRowsCount: ({ commit }, value) => {
        commit(types.SET_ROWS_COUNT, value);
    },
    setTree: ({ commit }, tree) => {
        commit(types.SET_TREE, tree);
    },
    setFullTree: ({ commit, state }, tree) => {
        const newFullTree = getFullTree(state.hiddenItems, tree);
        commit(types.SET_FULL_TREE, newFullTree);
    },
    setTreeWhenCollapse: ({ commit }, { tree, index }) => {
        const newTree = getTreeWhenElementCollapse(tree, index);
        commit(types.SET_TREE, newTree);
    },
    setTreeWhenExpand: ({ commit, state }, { id, index }) => {
        const newTree = getTreeWhenElementExpand(state.hiddenItems[id], state.treeData, index);
        commit(types.SET_TREE, newTree);
    },
    setExpandItem: ({ commit }, { index, value }) => {
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
    addTreeItem: ({ commit, getters }, item) => {
        // TODO: Method is not clear, too many dependencies, I need to dispatch list/setDisabledElement, not sure if that place is good
        const findIndex = getters.getIndexById(item.id);
        if (findIndex >= 0) {
            commit(types.SET_TREE_ITEM, { index: findIndex, item });
        } else {
            commit(types.ADD_TREE_ITEM, item);
        }
    },
    rebuildTree: ({
        commit, state, getters, dispatch,
    }, id) => {
        const index = getters.getIndexById(id);
        const newTree = getTreeWhenGhostElementRemoved(state.treeData, index);
        dispatch('setFullTree', newTree);
        commit(types.SET_TREE, newTree);
    },
    removeTreeItem: ({ commit, state, dispatch }, id) => {
        // TODO: Method is not clear, too many dependencies, I need to dispatch list/removeDisabledElement, not sure if that place is good
        let newTree = [];
        if (Number.isInteger(id)) {
            newTree = getTreeWhenElementRemoved(state.treeData, id);
            dispatch('setFullTree', newTree);
        } else {
            newTree = state.treeData.filter(el => el.id !== id);
        }
        commit(types.SET_TREE, newTree);
    },
    removeHiddenItem: ({ commit }, key) => {
        commit(types.REMOVE_HIDDEN_ITEM, key);
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STATE),
};
