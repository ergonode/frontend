/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { getMappedParameterValues, getMappedOptions } from '~/model/mappers/attributeMapper';

export default {
    setAttributeID({ commit }, id) {
        commit(types.SET_ATTRIBUTE_ID, id);
    },
    setAttributeCode({ commit }, code) {
        commit(types.SET_ATTRIBUTE_CODE, code);
    },
    setAttributeParameter({ commit }, parameter = null) {
        commit(types.SET_ATTRIBUTE_PARAMETER, parameter);
    },
    setAttributeGroups({ commit }, groups) {
        commit(types.SET_ATTRIBUTE_GROUPS, groups);
    },
    setAttributeType({ commit }, type) {
        commit(types.SET_ATTRIBUTE_TYPE, type);
    },
    setMultilingualAttribute({ commit }, isMultilingual) {
        commit(types.SET_MULTILINGUAL_ATTRIBUTE, isMultilingual);
    },
    addAttributeOptionKey({ commit }, key) {
        commit(types.ADD_ATTRIBUTE_OPTION_KEY, key);
    },
    removeAttributeOptionKey({ commit }, key) {
        commit(types.REMOVE_ATTRIBUTE_OPTION_KEY, key);
    },
    removeAttributeOptions({ commit }) {
        commit(types.INITIALIZE_OPTIONS);
    },
    setAttributeOptionKey({ commit }, { oldKey, newKey }) {
        commit(types.SET_ATTRIBUTE_OPTION_KEY, { oldKey, newKey });
    },
    setOptionValueForLanguageCode({ commit, state }, { key, value, languageCode }) {
        const { isMultilingual } = state;

        if (isMultilingual) {
            commit(types.SET_OPTION_VALUE_FOR_LANGUAGE_CODE, { languageCode, key, value });
        } else {
            commit(types.SET_OPTION_VALUE, { key, value });
        }
    },
    getAttributeGroups({ commit, rootState }) {
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$get(`${userLanguageCode}/attributes/groups`).then(({ collection }) => {
            commit(types.SET_ATTRIBUTE_GROUPS_OPTIONS, collection.map((group) => ({
                id: group.id,
                key: group.code,
                value: group.name,
                hint: group.name ? `#${group.code}` : '',
            })));
        });
    },
    getAttributeById(
        {
            dispatch, commit, state, rootState,
        },
        { attributeId, onError = () => {} },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { attrTypes } = rootState.data;
        const { groupOptions } = state;

        return this.app.$axios.$get(`${userLanguageCode}/attributes/${attributeId}`).then(({
            id,
            code,
            type,
            hint = '',
            label = '',
            groups: groupIds,
            options,
            parameters,
            placeholder = '',
            multilingual,
        }) => {
            const translations = {
                hint,
                label,
                placeholder,
            };

            commit(types.SET_ATTRIBUTE_ID, id);
            commit(types.SET_ATTRIBUTE_CODE, code);
            commit(types.SET_ATTRIBUTE_TYPE, attrTypes[type]);
            commit(types.SET_MULTILINGUAL_ATTRIBUTE, multilingual);
            commit(types.SET_ATTRIBUTE_GROUPS, groupOptions.filter(
                (group) => groupIds.some((groupId) => group.id === groupId),
            ));

            dispatch('translations/setTabTranslations', translations, { root: true });

            if (parameters) {
                commit(
                    types.SET_ATTRIBUTE_PARAMETER,
                    getMappedParameterValues(type, parameters, rootState.data),
                );
            }

            if (options) {
                commit(types.INITIALIZE_OPTIONS, getMappedOptions(options));
            }
        }).catch((e) => onError(e.data));
    },
    async createAttribute(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$post(`${userLanguageCode}/attributes`, data).then(({ id }) => {
            commit(types.SET_ATTRIBUTE_ID, id);
            onSuccess(id);
        }).catch((e) => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    async updateAttribute(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/attributes/${id}`, data).then(() => {
            onSuccess();
        }).catch((e) => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeAttribute({ state, rootState }, { onSuccess }) {
        const { id } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/attributes/${id}`).then(() => onSuccess());
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
