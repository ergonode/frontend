/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setAction: ({ commit }, payload) => {
        commit('setState', payload);
    },
    getCategoryById(
        { commit, rootState },
        { categoryId, onError },
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

            commit('setState', { key: 'id', value: id });
            commit('setState', { key: 'code', value: code });
            commit('setState', { key: 'name', value: name });

            commit('translations/setTabTranslations', { translations }, { root: true });
        }).catch(e => onError(e.data));
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
            commit('setState', { key: 'id', value: id });
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
        return this.app.$axios.$put(`${userLanguageCode}/categories/${id}`, data).then(response => onSuccess(response)).catch(e => onError(e.data));
    },
    clearStorage: ({ commit }) => {
        commit('clearStorage');
    },
};
