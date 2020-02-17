/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setCode({ commit }, code) {
        commit(types.SET_CODE, code);
    },
    setType({ commit }, type) {
        commit(types.SET_TYPE, type);
    },
    getProductCollectionTypes({ commit, rootState }) {
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$get(`${userLanguageCode}/collections/types`).then(({ collection }) => {
            commit(types.SET_COLLECTION_TYPES_OPTIONS, collection.map(type => ({
                id: type.id,
                key: type.code,
                value: type.name,
                hint: type.name ? `#${type.code}` : '',
            })));
        });
    },
    getProductCollectionById(
        {
            commit, dispatch, state, rootState,
        },
        { collectionId, onError = () => {} },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { types: collectionTypes } = state;

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

            commit(types.SET_ID, id);
            commit(types.SET_CODE, code);
            commit(types.SET_TYPE, collectionTypes.filter(
                type => type.id === type_id,
            ));

            console.log();

            dispatch('translations/setTabTranslations', translations, { root: true });
        }).catch(onError);
    },
    updateProductCollection(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/collections/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    removeProductCollection({ state, rootState }, { onSuccess }) {
        const { id } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/collections/${id}`).then(() => onSuccess());
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
