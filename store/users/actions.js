/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable camelcase */
import { types } from './mutations';
import { getKeyByValue } from '~/model/objectWrapper';

export default {
    setAction: ({ commit }, payload) => {
        commit(types.SET_STATE, payload);
    },
    setUserLanguage: ({ commit, rootState }, { language }) => {
        const { languages } = rootState.data;
        const lang = getKeyByValue(languages, language);
        commit(types.SET_STATE, { key: 'language', value: lang });
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
            role_id = '',
        }) => {
            commit(types.SET_STATE, { key: 'id', value: id });
            commit(types.SET_STATE, { key: 'avatarId', value: avatar_id });
            commit(types.SET_STATE, { key: 'email', value: email });
            commit(types.SET_STATE, { key: 'firstName', value: first_name });
            commit(types.SET_STATE, { key: 'lastName', value: last_name });
            commit(types.SET_STATE, { key: 'language', value: language });
            commit(types.SET_STATE, { key: 'password', value: password });
            commit(types.SET_STATE, { key: 'passwordRepeat', value: password_repeat });
            commit(types.SET_STATE, { key: 'status', value: status });
            commit(types.SET_STATE, { key: 'roleId', value: role_id });
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
            commit(types.SET_STATE, { key: 'id', value: id });
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
            this.app.$axios.$put(`${userLanguageCode}/accounts/${id}`, data),
            this.app.$axios.$put(`${userLanguageCode}/accounts/${id}/avatar`, { multimedia: avatarId }),
        ]).then(() => onSuccess()).catch(e => onError(e.data));
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
