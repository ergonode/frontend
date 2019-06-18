/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { getMappedGroupLabels, getMappedOptionKeysValues, getMappedParameterValues } from '~/model/mappers/attributeMapper';

export default {
    setAttributeID: ({ commit }, { id }) => {
        commit(types.SET_ATTRIBUTE_ID, id);
    },
    addAttributeOptionKey: ({ commit }, { key }) => {
        commit(types.ADD_ATTRIBUTE_OPTION_KEY, key);
    },
    removeAttributeOptions: ({ commit }) => {
        commit(types.INITIALIZE_OPTION_KEYS, []);
    },
    removeAttributeOptionKey: ({ commit, state }, { index }) => {
        const { optionValues, isMultilingual } = state;

        commit(types.REMOVE_ATTRIBUTE_OPTION_KEY, index);

        if (isMultilingual) {
            Object.keys(optionValues).forEach((languageCode) => {
                commit(types.REMOVE_ATTRIBUTE_OPTION_VALUE, { languageCode, index });
            });
        }
    },
    setAttributeOptionKey: ({ commit }, { index, key }) => {
        commit(types.SET_ATTRIBUTE_OPTION_KEY, { index, key });
    },
    setOptionValueForLanguageCode: ({ commit, state }, { index, value, languageCode }) => {
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
    setAttributeCode: ({ commit }, { code }) => {
        commit(types.SET_ATTRIBUTE_CODE, code);
    },
    setAttributeParameter: ({ commit }, { parameter }) => {
        commit(types.SET_ATTRIBUTE_PARAMETER, parameter);
    },
    setAttributeGroups: ({ commit }, { groups }) => {
        commit(types.SET_ATTRIBUTE_GROUPS, groups);
    },
    setAttributeType: ({ commit }, { type }) => {
        commit(types.SET_ATTRIBUTE_TYPE, type);
    },
    getAttributeById(
        { dispatch, commit, rootState },
        { attributeId, onError },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$get(`${userLanguageCode}/attributes/${attributeId}`).then(({
            id,
            code,
            type,
            hint = '',
            label = '',
            groups,
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
            commit(types.SET_ATTRIBUTE_TYPE, rootState.data.attrTypes[type]);
            commit(types.SET_MULTILINGUAL_ATTRIBUTE, { isMultilingual: multilingual });
            commit(types.SET_ATTRIBUTE_GROUPS, getMappedGroupLabels(
                rootState.data.attrGroups,
                groups,
            ));

            dispatch('translations/setTabTranslations', { translations }, { root: true });

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
        }).catch(e => onError(e));
    },
    setMultilingualAttribute: ({ commit }, payload) => {
        commit(types.SET_MULTILINGUAL_ATTRIBUTE, payload);
    },
    createAttribute(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/attributes`, data).then(({ id }) => {
            commit(types.SET_ATTRIBUTE_ID, id);
            onSuccess(id);
        }).catch(e => onError(e.data));
    },
    updateAttribute(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/attributes/${id}`, data).then(() => {
            onSuccess();
        }).catch(e => onError(e.data));
    },
    clearStorage: ({ commit }) => {
        commit(types.CLEAR_STATE);
    },
};
