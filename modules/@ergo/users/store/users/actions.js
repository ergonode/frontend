/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getKeyByValue } from '@Core/models/objectWrapper';
import { isObject } from '@Core/models/objectWrapper';
import { types } from './mutations';

export default {
    setAction({ commit }, payload) {
        commit(types.SET_STATE, payload);
    },
    setLanguagePrivileges({ commit }, privileges) {
        commit(types.SET_LANGUAGE_PRIVILEGES, privileges);
    },
    setUserLanguage({ commit, rootState }, { language }) {
        const { languages } = rootState.dictionaries;
        const lang = getKeyByValue(languages, language);

        commit(types.SET_STATE, { key: 'language', value: lang });
    },
    getUserById(
        { commit, rootState },
        { userId, onError = () => {} },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { languages } = rootState.dictionaries;

        return this.app.$axios.$get(`${userLanguageCode}/accounts/${userId}`).then(({
            id,
            email = '',
            avatar_id = '',
            first_name = '',
            last_name = '',
            language = '',
            password = '',
            password_repeat = '',
            is_active = false,
            role_id,
            language_privileges_collection = null,
        }) => {
            commit(types.SET_STATE, { key: 'id', value: id });
            commit(types.SET_STATE, { key: 'avatarId', value: avatar_id });
            commit(types.SET_STATE, { key: 'email', value: email });
            commit(types.SET_STATE, { key: 'firstName', value: first_name });
            commit(types.SET_STATE, { key: 'lastName', value: last_name });
            commit(types.SET_STATE, { key: 'language', value: languages[language] });
            commit(types.SET_STATE, { key: 'password', value: password });
            commit(types.SET_STATE, { key: 'passwordRepeat', value: password_repeat });
            commit(types.SET_STATE, { key: 'isActive', value: is_active });
            commit(types.SET_STATE, {
                key: 'languagePrivilegesCollection',
                value: isObject(language_privileges_collection)
                    ? { ...language_privileges_collection }
                    : language_privileges_collection,
            });
            commit(types.SET_STATE, { key: 'role', value: role_id });
        }).catch(onError);
    },
    async updateUser(
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

        await this.$setLoader('footerButton');
        await Promise.all([
            this.app.$axios.$put(`${userLanguageCode}/accounts/${id}`, data),
            this.app.$axios.$put(`${userLanguageCode}/accounts/${id}/avatar`, { multimedia: avatarId }),
        ]).then(() => onSuccess()).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
