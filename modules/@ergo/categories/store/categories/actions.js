/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    types,
} from './mutations';

export default {
    getCategoryById(
        {
            commit, dispatch, rootState,
        },
        {
            categoryId, onError = () => {},
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/categories/${categoryId}`).then(({
            id,
            code,
            name = '',
        }) => {
            const translations = {
                name,
            };

            commit(types.SET_ID, id);
            commit(types.SET_CODE, code);
            commit(types.SET_NAME, name);

            dispatch('translations/setTabTranslations', translations, {
                root: true,
            });
        }).catch(onError);
    },
    async updateCategory(
        {
            rootState,
        },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/categories/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeCategory({
        state, rootState,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/categories/${id}`).then(() => onSuccess());
    },
    setCategoryCode({
        commit,
    }, code) {
        commit(types.SET_CODE, code);
    },
    clearStorage({
        commit,
    }) {
        commit(types.CLEAR_STATE);
    },
};
