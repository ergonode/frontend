/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getListItems } from '@Core/services/list/getList.service';
import { getParsedTreeData } from '@Trees/models/treeMapper';

import { types } from './mutations';

export default {
    async getTreeById(
        { commit, dispatch, rootState },
        { treeId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        await this.app.$axios.$get(`${userLanguageCode}/trees/${treeId}`).then(async ({
            code,
            name = '',
            categories,
        }) => {
            if (categories.length) {
                await getListItems({
                    $axios: this.app.$axios,
                    path: `${userLanguageCode}/categories`,
                    params: {
                        // limit: categories.length,
                        limit: 99999,
                        offset: 0,
                        // TODO: BE has no filter via ID's - we gonna wait for them
                        // filter: `category_id=${categories.map(category => category.id).join(',')}`,
                        view: 'list',
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
