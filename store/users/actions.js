/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable camelcase */
import { getKeyByValue } from '~/model/objectWrapper';

export default {
    setAction: ({ commit }, payload) => {
        commit('setState', payload);
    },
    setUserLanguage: ({ commit, rootState }, { language }) => {
        const { languages } = rootState.data;
        const lang = getKeyByValue(languages, language);
        commit('setState', { key: 'language', value: lang });
    },
    getUserById(
        { commit, rootState },
        { userId, onError },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/accounts/${userId}`).then(({
            id,
            email = '',
            avatar_id = '',
            first_name = '',
            last_name = '',
            language = '',
            password = '',
            password_repeat = '',
            status = '',
        }) => {
            commit('setState', { key: 'id', value: id });
            commit('setState', { key: 'avatarId', value: avatar_id });
            commit('setState', { key: 'email', value: email });
            commit('setState', { key: 'firstName', value: first_name });
            commit('setState', { key: 'lastName', value: last_name });
            commit('setState', { key: 'language', value: language });
            commit('setState', { key: 'password', value: password });
            commit('setState', { key: 'passwordRepeat', value: password_repeat });
            commit('setState', { key: 'status', value: status });
        }).catch(e => onError(e.data));
    },
    createUser(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/accounts`, data).then(({ id }) => {
            commit('setState', { key: 'id', value: id });
            onSuccess(id);
        }).catch(e => onError(e.data));
    },
    updateUser(
        { rootState },
        {
            id,
            data,
            avatarId,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        return Promise.all([
            this.app.$axios.$put(`${userLanguageCode}/accounts/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data)),
            this.app.$axios.$put(`${userLanguageCode}/accounts/${id}/avatar`, { multimedia: avatarId }).then(() => onSuccess()).catch(e => onError(e.data)),
        ]);
    },
    clearStorage: ({ commit }) => {
        commit('clearStorage');
    },
};
