/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import treeData from '~/model/tree/treeData';

export default {
    setRowsCount: ({ commit }, value) => {
        commit('setRowsCount', value);
    },
    getTreeById(
        { commit, rootState },
        { treeId, onError },
    ) {
        const sortedData = treeData.sort((a, b) => a.row - b.row);
        commit('setTree', sortedData);
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/trees/${treeId}`).then(() => {
            // TODO: uncomment when we have date from API
            // commit('setTree', response.data);
        }).catch(e => onError(e.data));
    },
    addTreeItem: ({ commit, state }, item) => {
        const findIndex = state.treeData.findIndex(el => el.id === item.id);
        if (findIndex >= 0) {
            commit('setTreeItem', { index: findIndex, item });
        } else {
            commit('addTreeItem', item);
        }
    },
    removeTreeItem: ({ commit }, id) => {
        commit('removeTreeItem', id);
    },
    rebuildTree: ({ commit, state }, id) => {
        const findIndex = state.treeData.findIndex(el => el.id === id);
        const newTree = state.treeData.reduce((accumulator, current, i) => {
            if (i === findIndex && current.row !== 0) {
                accumulator.push({ ...current, row: current.row + 0.5 });
            } else if (i > findIndex) {
                accumulator.push({ ...current, row: current.row + 1 });
            } else {
                accumulator.push(current);
            }
            return accumulator;
        }, []);
        commit('rebuildTree', { tree: newTree });
    },
    setHiddenItem: ({ commit }, { key, value }) => {
        commit('setHiddenItem', { key, value });
    },
    removeHiddenItem: ({ commit }, key) => {
        commit('removeHiddenItem', key);
    },
    clearStorage: ({ commit }) => commit('clearStorage'),
};
