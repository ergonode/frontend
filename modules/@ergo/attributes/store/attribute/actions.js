/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getMappedParameterValues, getMappedOptions } from '@Attributes/models/attributeMapper';
import { isEmpty, isObject } from '@Core/models/objectWrapper';
import { types } from './mutations';

export default {
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
    addAttributeOptionKey({ commit }, index) {
        commit(types.ADD_ATTRIBUTE_OPTION_KEY, index);
    },
    removeAttributeOptionKey({ commit, dispatch }, { id, index }) {
        if (id) {
            dispatch('removeOptionById', { id, index });
        } else {
            commit(types.REMOVE_ATTRIBUTE_OPTION_KEY, index);
        }
    },
    removeAttributeOptions({ commit }) {
        commit(types.INITIALIZE_OPTIONS);
    },
    removeOptionById({ commit, state, rootState }, { id, index }) {
        return this.app.$axios.$delete(`${rootState.authentication.user.language}/attributes/${state.id}/options/${id}`)
            .then(() => commit(types.REMOVE_ATTRIBUTE_OPTION_KEY, index));
    },
    updateAttributeOptionKey({ commit }, payload) {
        if (payload.id) {
            commit(types.SET_UPDATED_OPTION, payload.id);
        }
        commit(types.SET_ATTRIBUTE_OPTION_KEY, payload);
    },
    setOptionValueForLanguageCode({ commit, state }, {
        index, languageCode, value, id,
    }) {
        const { isMultilingual } = state;

        if (isMultilingual) {
            if (!state.options[index].value || !state.options[index].value[languageCode]) {
                commit(types.SET_OPTION_LANGUAGE_CODE_FOR_VALUE, { index, languageCode });
            }

            commit(types.SET_OPTION_VALUE_FOR_LANGUAGE_CODE, {
                index, languageCode, value,
            });
        } else {
            commit(types.SET_OPTION_VALUE, { index, value });
        }

        if (id) {
            commit(types.SET_UPDATED_OPTION, id);
        }
    },
    getAttributeGroups({ commit, rootState }) {
        return this.app.$axios.$get(`${rootState.authentication.user.language}/attributes/groups`).then(({ collection }) => {
            commit(types.SET_ATTRIBUTE_GROUPS_OPTIONS, collection.map(group => ({
                id: group.id,
                key: group.code,
                value: group.name,
                hint: group.name ? `#${group.code}` : '',
            })));
        });
    },
    getAttributeOptionsById({ commit, rootState }, { id }) {
        return this.app.$axios.$get(`${rootState.authentication.user.language}/attributes/${id}/options`).then(options => commit(types.INITIALIZE_OPTIONS, getMappedOptions(options)));
    },
    getAttributeById({
        dispatch, commit, state, rootState,
    }, { id }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { attrTypes } = rootState.dictionaries;
        const { groupOptions } = state;

        return this.app.$axios.$get(`${userLanguageCode}/attributes/${id}`).then(({
            code,
            type,
            hint = '',
            label = '',
            groups: groupIds,
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
                group => groupIds.some(groupId => group.id === groupId),
            ));

            dispatch('translations/setTabTranslations', translations, { root: true });

            if (parameters) {
                commit(
                    types.SET_ATTRIBUTE_PARAMETER,
                    getMappedParameterValues(type, parameters, rootState.dictionaries),
                );
            }
        });
    },
    async updateAttribute(
        { state, commit, rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { allLanguages } = rootState.dictionaries;
        const optionsToAddRequests = [];
        const optionsToUpdateRequests = [];

        Object.keys(state.options).forEach((key) => {
            const option = state.options[key];
            const optionValue = !state.isMultilingual
                ? allLanguages.reduce((acc, e) => {
                    const opt = acc;

                    opt[e.code] = isObject(option.value) && isEmpty(option.value) ? '' : option.value;
                    return opt;
                }, {})
                : option.value;

            if (!option.id) {
                optionsToAddRequests.push(
                    this.app.$axios.$post(`${userLanguageCode}/attributes/${id}/options`, {
                        code: option.key,
                        label: option.value ? optionValue : {},
                    }).catch(e => onError(e.data)),
                );
            } else if (state.updatedOptions[option.id]) {
                optionsToUpdateRequests.push(
                    this.app.$axios.$put(`${userLanguageCode}/attributes/${id}/options/${option.id}`, {
                        code: option.key,
                        label: optionValue,
                    }).catch(e => onError(e.data)),
                );
            }
        });

        await this.$setLoader('footerButton');
        await Promise.all([
            this.app.$axios.$put(`${userLanguageCode}/attributes/${id}`, data).catch(e => onError(e.data)),
            ...optionsToAddRequests,
            ...optionsToUpdateRequests,
        ]).then(() => {
            commit(types.REMOVE_UPDATED_OPTION);
            onSuccess();
        });

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
