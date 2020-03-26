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
    setConfiguration({ commit }, configuration) {
        commit(types.SET_CONFIGURATION, configuration);
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
            ...rest
        }) => {
            commit(types.SET_ID, id);
            commit(types.SET_NAME, name);
            commit(types.SET_TYPE, sources[type]);
            commit(types.SET_CONFIGURATION, JSON.stringify(rest));
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
        return this.app.$axios.$put(`${rootState.authentication.user.language}/sources/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
