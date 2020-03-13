/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getParsedTreeData } from '@Trees/models/treeMapper';
import { getListItems } from '@Core/services/list/getList.service';
import { types } from './mutations';

export default {
    getTreeById(
        { commit, dispatch, rootState },
        { treeId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$get(`${userLanguageCode}/trees/${treeId}`).then(({
            code,
            name = '',
            categories,
        }) => {
            if (categories.length) {
                getListItems({
                    $axios: this.app.$axios,
                    path: `${userLanguageCode}/categories`,
                    params: {
                        limit: categories.length,
                        offset: 0,
                        filter: `category_id=${categories.map(category => category.id).join(',')}`,
                        field: 'code',
                        order: 'ASC',
                    },
                }).then(({ items }) => {
                    const treeToSet = getParsedTreeData(categories, items);

                    treeToSet.forEach(e => dispatch('list/setDisabledElement', { languageCode: userLanguageCode, elementId: e.id, disabled: true }, { root: true }));
                    dispatch('gridDesigner/setGridData', treeToSet, { root: true });
                    dispatch('gridDesigner/setFullGridData', treeToSet, { root: true });
                });
            }

            const translations = {
                name,
            };

            commit(types.SET_TREE_ID, treeId);
            commit(types.SET_CODE, code);
            dispatch('translations/setTabTranslations', translations, { root: true });
        });
    },
    async updateTree(
        { rootState },
        {
            id, data, onSuccess,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/trees/${id}`, data).then(() => {
            onSuccess();
        });
        await this.$removeLoader('footerButton');
    },
    setTreeCode({ commit }, code) {
        commit(types.SET_CODE, code);
    },
    removeCategoryTree({ state, rootState }, { onSuccess }) {
        const { treeId } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/trees/${treeId}`).then(() => onSuccess());
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STATE),
};
