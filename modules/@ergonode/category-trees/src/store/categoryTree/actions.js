/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getListItems,
} from '@Core/services/list/getList.service';
import {
    getMappedTreeData,
    getParsedTreeData,
} from '@Trees/models/treeMapper';
import {
    create,
    get,
    remove,
    update,
} from '@Trees/services/index';

export default {
    async createCategoryTree({
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                code,
            } = state;

            const data = {
                code,
            };
            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            onSuccess(id);
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope: 'categoryTreeForm',
            });
        }
    },
    async getCategoryTree(
        {
            commit,
            dispatch,
            rootState,
        },
        {
            id,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        const {
            code,
            name = '',
            categories,
        } = await get({
            $axios: this.app.$axios,
            id,
        });

        if (categories.length) {
            const {
                items,
            } = await getListItems({
                $axios: this.app.$axios,
                path: `${userLanguageCode}/categories`,
                params: {
                    limit: 99999,
                    offset: 0,
                    // TODO: BE has no filter via ID's - we gonna wait for them
                    // filter: `category_id=${categories.map(category => category.id).join(',')}`,
                    view: 'list',
                    field: 'code',
                    order: 'ASC',
                },
            });

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
        }

        const translations = {
            name,
        };

        commit('__SET_STATE', {
            key: 'id',
            value: id,
        });
        commit('__SET_STATE', {
            key: 'code',
            value: code,
        });
        dispatch('tab/setTranslations', translations, {
            root: true,
        });
    },
    async updateCategoryTree(
        {
            state,
            rootState,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
            } = state;

            const {
                translations: {
                    name,
                },
            } = rootState.tab;
            const {
                fullGridData,
            } = rootState.gridDesigner;
            const data = {
                name,
                categories: getMappedTreeData(fullGridData),
            };
            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope: 'categoryTreeGeneralTab',
            });
        }
    },
    async removeCategoryTree({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        await remove({
            $axios: this.app.$axios,
            id,
        });
        onSuccess();
    },
};
