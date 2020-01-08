/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { getMappedOptionKeysValues, getMappedParameterValues } from '~/model/mappers/attributeMapper';

export default {
    addAttributeOptionKey({ commit }, key) {
        commit(types.ADD_ATTRIBUTE_OPTION_KEY, key);
    },
    removeAttributeOptions({ commit }) {
        commit(types.INITIALIZE_OPTION_KEYS, []);
    },
    removeAttributeOptionKey({ commit, state }, index) {
        const { optionValues, isMultilingual } = state;

        commit(types.REMOVE_ATTRIBUTE_OPTION_KEY, index);

        if (isMultilingual) {
            Object.keys(optionValues).forEach((languageCode) => {
                commit(types.REMOVE_ATTRIBUTE_OPTION_VALUE, { languageCode, index });
            });
        }
    },
    setAttributeOptionKey({ commit }, { index, key }) {
        commit(types.SET_ATTRIBUTE_OPTION_KEY, { index, key });
    },
    setOptionValueForLanguageCode({ commit, state }, { index, value, languageCode }) {
        const { isMultilingual, optionValues } = state;

        if (isMultilingual) {
            if (!optionValues[languageCode]) {
                commit(types.INITIALIZE_OPTION_VALUE_FOR_LANGUAGE_CODE, languageCode);
            }

            commit(types.SET_OPTION_VALUE_FOR_LANGUAGE_CODE, { languageCode, index, value });
        } else {
            if (!Array.isArray(optionValues)) {
                commit(types.INITIALIZE_OPTION_VALUES);
            }

            commit(types.SET_OPTION_VALUE, { index, value });
        }
    },
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
                const {
                    optionKeys, optionValues,
                } = getMappedOptionKeysValues(options, multilingual);

                commit(types.INITIALIZE_OPTION_KEYS, optionKeys);
                commit(types.INITIALIZE_OPTION_VALUES, optionValues);
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
