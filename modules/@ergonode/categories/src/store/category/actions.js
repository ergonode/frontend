/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    getAll,
    remove,
    update,
} from '@Categories/services/index';

export default {
    async createCategory({
        state,
    },
    {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                code,
            } = state;

            await create({
                $axios: this.app.$axios,
                data: {
                    code,
                },
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async getCategory(
        {
            commit,
            dispatch,
        },
        {
            id,
        },
    ) {
        const {
            code,
            name = '',
        } = await get({
            $axios: this.app.$axios,
            id,
        });

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
        commit('__SET_STATE', {
            key: 'name',
            value: name,
        });

        dispatch('tab/setTranslations', translations, {
            root: true,
        });
    },
    getCategoriesOptions({
        rootState,
    }) {
        const {
            language,
        } = rootState.authentication.user;

        return getAll({
            $axios: this.app.$axios,
        }).then(({
            collection,
        }) => ({
            options: collection.map(element => ({
                id: element.id,
                key: element.code,
                value: element.name,
                hint: element.name ? `#${element.code} ${language}` : '',
            })),
        }));
    },
    async updateCategory(
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
            } = rootState;
            const data = {
                name,
            };

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async removeCategory({
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
