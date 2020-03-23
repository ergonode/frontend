/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setName({ commit }, name) {
        commit(types.SET_NAME, name);
    },
    setType({ commit }, type) {
        commit(types.SET_TYPE, type);
    },
    getImportProfileById(
        {
            commit, rootState,
        },
        { id, onError = () => {} },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { sources } = rootState.dictionaries;

        return this.app.$axios.$get(`${userLanguageCode}/sources/${id}`).then(({
            name,
            type,
        }) => {
            commit(types.SET_ID, id);
            commit(types.SET_NAME, name);
            commit(types.SET_TYPE, sources[type]);
        }).catch(onError);
    },
    getConfigurationByTypeId(
        {
            commit, rootState,
        },
        { id, onError = () => {} },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$get(`${userLanguageCode}/sources/${id}/configuration`).then((response) => {
            console.log(response);
        }).catch(onError);
    },
    updateImportProfile(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        // TODO: It's not supported via BE yet - to refinement
        return this.app.$axios.$put(`${userLanguageCode}/sources/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
