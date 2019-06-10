/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getMappedGroupLabels, getMappedOptionKeysValues, getMappedParameterValues } from '~/model/mappers/attributeMapper';

export default {
    setAttributeID: ({ commit }, payload) => {
        commit('setAttributeID', payload);
    },
    addAttributeOptionKey: ({ commit, rootState }, { key }) => {
        const { language: userLanguageCode } = rootState.authentication.user;
        commit('addAttributeOptionKey', { key });

        if (!rootState.translations.optionTranslationsValues[userLanguageCode]) {
            commit('translations/addOptionTranslation', { languageCode: userLanguageCode }, { root: true });
        }

        Object.keys(rootState.translations.optionTranslationsValues).forEach((languageCode) => {
            commit('translations/addOptionTranslationValueForLanguage', { languageCode }, { root: true });
        });
    },
    removeAttributeOptions: ({ commit }) => commit('initializeOptionKeys', { optionKeys: [] }),
    removeAttributeOptionKey: ({ commit, rootState }, { index }) => {
        commit('removeAttributeOptionKey', { index });
        Object.keys(rootState.translations.optionTranslationsValues).forEach((languageCode) => {
            commit('translations/removeAttributeOptionTranslationValueForLanguage', { languageCode, index }, { root: true });
        });
    },
    setAttributeOptionKey: ({ commit }, { index, key }) => {
        commit('setAttributeOptionKey', { index, key });
    },
    setAttributeOptionKeyValue: ({ commit, state, rootState }, { index, value, languageCode }) => {
        if (!state.isMultilingual) {
            const firstElement = Object.keys(rootState.translations.translations)[0];
            Object.keys(rootState.translations.translations[firstElement]).forEach((language) => {
                commit('translations/setAttributeOptionKeyValue', {
                    languageCode: language,
                    index,
                    value,
                }, { root: true });
            });
        } else {
            commit('translations/setAttributeOptionKeyValue', { index, value, languageCode }, { root: true });
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
                const { optionKeys, optionTranslations } = getMappedOptionKeysValues(options);

                commit('initializeOptionKeys', { optionKeys });
                commit('translations/initializeOptionTranslationValues', { optionTranslations }, { root: true });
            }
        }).catch(e => onError(e.data));
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
