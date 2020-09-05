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
} from '@Categories/services';

export default {
    createCategory({
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
    getCategory(
        {
            commit, dispatch,
        },
        {
            categoryId, onError = () => {},
        },
    ) {
        return get({
            $axios: this.app.$axios,
            id: categoryId,
        }).then(({
            id,
            code,
            name = '',
        }) => {
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
        }).catch(onError);
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
        {},
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        this.$setLoader('footerButton');
        await update({
            $axios: this.app.$axios,
            id,
            data,
        }).then(() => onSuccess()).catch(e => onError(e.data));
        this.$removeLoader('footerButton');
    },
    removeCategory({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        return remove({
            $axios: this.app.$axios,
            id,
        }).then(() => onSuccess());
    },
};
