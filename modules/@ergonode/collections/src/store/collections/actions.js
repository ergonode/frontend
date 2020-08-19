/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getCollection(
        {
            commit, dispatch, rootState,
        },
        {
            collectionId, onError = () => {},
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$get(`${userLanguageCode}/collections/${collectionId}`).then(({
            id,
            code,
            type_id,
            name = {},
            description = {},
        }) => {
            const translations = {
                name,
                description,
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
                key: 'type',
                value: type_id,
            });

            dispatch('translations/setTabTranslations', translations, {
                root: true,
            });
        }).catch(onError);
    },
    updateCollection(
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
        return this.app.$axios.$put(`${userLanguageCode}/collections/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    removeCollection({
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
        return this.app.$axios.$delete(`${userLanguageCode}/collections/${id}`).then(() => onSuccess());
    },
};
