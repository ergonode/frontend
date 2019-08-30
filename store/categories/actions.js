/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    getCategoryById(
        { commit, rootState },
        { categoryId, onError = () => {} },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
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

            commit('translations/setTabTranslations', { translations }, { root: true });
        }).catch(onError);
    },
    createCategory(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/categories`, data).then(({ id }) => {
            commit(types.SET_ID, id);
            onSuccess(id);
        }).catch(e => onError(e.data));
    },
    updateCategory(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/categories/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    setCategoryCode({ commit }, code) {
        commit(types.SET_CODE, code);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
