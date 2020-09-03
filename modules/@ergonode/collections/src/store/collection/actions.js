/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getCollection(
        {
            commit, dispatch,
        },
        {
            collectionId, onError = () => {},
        },
    ) {
        return this.app.$axios.$get(`collections/${collectionId}`).then(({
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

            dispatch('tab/setTranslations', translations, {
                root: true,
            });
        }).catch(onError);
    },
    updateCollection(
        {},
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        return this.app.$axios.$put(`collections/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    removeCollection({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        return this.app.$axios.$delete(`collections/${id}`).then(() => onSuccess());
    },
};
