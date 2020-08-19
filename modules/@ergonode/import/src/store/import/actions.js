/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getImportProfile(
        {
            commit, rootState,
        },
        {
            id, onError = () => {},
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            sources,
        } = rootState.dictionaries;

        return this.app.$axios.$get(`${userLanguageCode}/sources/${id}`).then(({
            name,
            type,
            ...rest
        }) => {
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'name',
                value: name,
            });
            commit('__SET_STATE', {
                key: 'type',
                value: sources[type],
            });
            commit('__SET_STATE', {
                key: 'configuration',
                value: JSON.stringify(rest),
            });
        }).catch(onError);
    },
    updateImportProfile(
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
        return this.app.$axios.$put(`${rootState.authentication.user.language}/sources/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
};
