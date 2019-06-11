/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getMappedGroupLabels, getMappedOptionKeysValues, getMappedParameterValues } from '~/model/mappers/attributeMapper';

export default {
    setAttributeID: ({ commit }, payload) => {
        commit('setAttributeID', payload);
    },
    addAttributeOptionKey: ({ commit }, { key }) => commit('addAttributeOptionKey', { key }),
    removeAttributeOptions: ({ commit }) => commit('initializeOptionKeys', { optionKeys: [] }),
    removeAttributeOptionKey: ({ commit, state }, { index }) => {
        const { optionValues, isMultilingual } = state;

        commit('removeAttributeOptionKey', { index });

        if (isMultilingual) {
            Object.keys(optionValues).forEach((languageCode) => {
                commit('removeAttributeOptionValue', { languageCode, index });
            });
        }
    },
    setAttributeOptionKey: ({ commit }, { index, key }) => {
        commit('setAttributeOptionKey', { index, key });
    },
    setOptionValueForLanguageCode: ({ commit, state }, { index, value, languageCode }) => {
        const { isMultilingual, optionValues } = state;

        if (isMultilingual) {
            if (!optionValues[languageCode]) commit('initializeOptionValueForLanguageCode', { languageCode });

            commit('setOptionValueForLanguageCode', { languageCode, index, value });
        } else {
            if (!Array.isArray(optionValues)) commit('initializeOptionValues');

            commit('setOptionValue', { index, value });
        }
    },
    setAttributeCode: ({ commit }, payload) => {
        commit('setAttributeCode', payload);
    },
    setAttributeParameter: ({ commit }, payload) => {
        commit('setAttributeParameter', payload);
    },
    setAttributeGroups: ({ commit }, payload) => {
        commit('setAttributeGroups', payload);
    },
    setAttributeType: ({ commit }, payload) => {
        commit('setAttributeType', payload);
    },
    getAttributeById(
        { commit, rootState },
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

            commit('setAttributeID', { id });
            commit('setAttributeCode', { code });
            commit('setAttributeType', { type: rootState.data.attrTypes[type] });
            commit('setMultilingualAttribute', { isMultilingual: multilingual });
            commit('setAttributeGroups', {
                groups: getMappedGroupLabels(
                    rootState.data.attrGroups,
                    groups,
                ),
            });
            commit('translations/setTabTranslations', { translations }, { root: true });

            if (parameters) {
                commit('setAttributeParameter', { parameter: getMappedParameterValues(type, parameters, rootState.data) });
            }

            if (options) {
                const {
                    optionKeys, optionValues,
                } = getMappedOptionKeysValues(options, multilingual);

                commit('initializeOptionKeys', { optionKeys });
            }
        }).catch(e => onError(e));
    },
    setMultilingualAttribute: ({ commit }, payload) => commit('setMultilingualAttribute', payload),
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
            commit('setAttributeID', { id });
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
        commit('clearStorage');
    },
};
