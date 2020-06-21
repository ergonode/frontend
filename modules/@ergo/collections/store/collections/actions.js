/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    types,
} from './mutations';

export default {
    setCode({
        commit,
    }, code) {
        commit(types.SET_CODE, code);
    },
    setType({
        commit,
    }, type) {
        commit(types.SET_TYPE, type);
    },
    getCollectionById(
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

            commit(types.SET_ID, id);
            commit(types.SET_CODE, code);
            commit(types.SET_TYPE, type_id);

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
    clearStorage({
        commit,
    }) {
        commit(types.CLEAR_STATE);
    },
};
