/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    getResource({
        dispatch,
        commit,
        rootState,
    }, id) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$get(`${userLanguageCode}/multimedia/${id}`).then(({
            name,
            extension,
            alt,
        }) => {
            const translations = {
                alt: Array.isArray(alt) ? {} : alt,
            };

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'name',
                value: name.replace(`.${extension}`, ''),
            });
            commit('__SET_STATE', {
                key: 'extension',
                value: extension,
            });
            dispatch('tab/setTranslations', translations, {
                root: true,
            });
        });
    },
    updateResource({
        commit,
        state,
        rootState,
    }, {
        onSuccess,
        onError,
    }) {
        const {
            id,
            name,
            extension,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            translations: {
                alt,
            },
        } = rootState.tab;

        this.app.$axios
            .$put(`${userLanguageCode}/multimedia/${id}`, {
                name: `${name}.${extension}`,
                alt,
            })
            .then(() => onSuccess())
            .catch(e => onError(e.data));
    },
    removeResource({
        commit,
        rootState,
    }, {
        id,
        onSuccess,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        this.app.$axios
            .$delete(`${userLanguageCode}/multimedia/${id}`)
            .then(() => onSuccess());
    },
};
