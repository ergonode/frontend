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
        { commit, dispatch, rootState },
        { treeId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { [userLanguageCode]: categories } = rootState.list.elements;

        return this.app.$axios.$get(`${userLanguageCode}/trees/${treeId}`).then(({
            code,
            name = '',
            categories: treeData,
        }) => {
            const treeToSet = getParsedTreeData(treeData, categories);
            const translations = {
                name,
            };

            treeToSet.forEach(e => dispatch('list/setDisabledElement', { languageCode: userLanguageCode, elementId: e.id }, { root: true }));
            commit(types.SET_TREE, treeToSet);
            commit(types.SET_FULL_TREE, treeToSet);
            commit(types.SET_TREE_ID, treeId);
            commit(types.SET_CODE, code);
            commit('translations/setTabTranslations', { translations }, { root: true });
        }).catch(onDefaultError);
    },
    createTree(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/trees`, data).then(({ id }) => {
            commit(types.SET_TREE_ID, id);
            onSuccess(id);
        }).catch(e => onError(e.data));
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
    setTreeCode({ commit }, code) {
        commit(types.SET_CODE, code);
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
