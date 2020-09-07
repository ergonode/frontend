/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getListItems,
} from '@Core/services/list/getList.service';
import {
    getParsedTreeData,
} from '@Trees/models/treeMapper';
import {
    create,
    get,
    remove,
    update,
} from '@Trees/services/index';

export default {
    createCategoryTree({
        state,
    }) {
        const {
            code,
        } = state;

        return create({
            $axios: this.app.$axios,
            data: {
                code,
            },
        });
    },
    async getTree(
        {
            commit, dispatch, rootState,
        },
        {
            treeId,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await get({
            $axios: this.app.$axios,
            id: treeId,
        }).then(async ({
            code,
            name = '',
            categories,
        }) => {
            if (categories.length) {
                await getListItems({
                    $axios: this.app.$axios,
                    path: 'categories',
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
                }).then(({
                    items,
                }) => {
                    const treeToSet = getParsedTreeData(categories, items);

                    treeToSet.forEach(e => dispatch('list/setDisabledElement', {
                        languageCode: userLanguageCode,
                        elementId: e.id,
                        disabled: true,
                    }, {
                        root: true,
                    }));
                    dispatch('gridDesigner/setGridData', treeToSet, {
                        root: true,
                    });
                    dispatch('gridDesigner/setFullGridData', treeToSet, {
                        root: true,
                    });
                });
            }

            const translations = {
                name,
            };

            commit('__SET_STATE', {
                key: 'treeId',
                value: treeId,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            dispatch('tab/setTranslations', translations, {
                root: true,
            });
        });
    },
    async updateTree(
        {},
        {
            id, data, onSuccess,
        },
    ) {
        await update({
            $axios: this.app.$axios,
            id,
            data,
        }).then(() => {
            onSuccess();
        });
    },
    removeCategoryTree({
        state,
    }, {
        onSuccess,
    }) {
        const {
            treeId,
        } = state;

        return remove({
            $axios: this.app.$axios,
            id: treeId,
        }).then(() => onSuccess());
    },
};
