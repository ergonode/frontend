/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import {
    getMappedArrayOptions,
    getMappedParameterValues,
} from '@Attributes/models/attributeMapper';

import {
    types,
} from './mutations';

export default {
    setAttributeCode({
        commit,
    }, code) {
        commit(types.SET_ATTRIBUTE_CODE, code);
    },
    setAttributeParameter({
        commit,
    }, parameter = null) {
        commit(types.SET_ATTRIBUTE_PARAMETER, parameter);
    },
    setAttributeGroups({
        commit,
    }, groups) {
        commit(types.SET_ATTRIBUTE_GROUPS, groups);
    },
    setAttributeType({
        commit,
    }, type) {
        commit(types.SET_ATTRIBUTE_TYPE, type);
    },
    setAttributeScope({
        commit,
    }, scope) {
        commit(types.SET_ATTRIBUTE_SCOPE, scope);
    },
    addAttributeOptionKey({
        commit,
    }, index) {
        commit(types.ADD_ATTRIBUTE_OPTION_KEY, index);
    },
    removeAttributeOptionKey({
        commit, dispatch,
    }, {
        id, index,
    }) {
        if (id) {
            dispatch('removeOptionById', {
                id,
                index,
            });
        } else {
            commit(types.REMOVE_ATTRIBUTE_OPTION_KEY, index);
        }
    },
    removeAttributeOptions({
        commit,
    }) {
        commit(types.INITIALIZE_OPTIONS);
    },
    removeOptionById({
        commit, state, rootState,
    }, {
        id, index,
    }) {
        return this.app.$axios.$delete(`${rootState.authentication.user.language}/attributes/${state.id}/options/${id}`)
            .then(() => commit(types.REMOVE_ATTRIBUTE_OPTION_KEY, index));
    },
    updateAttributeOptionKey({
        commit,
    }, option) {
        if (option.id) {
            commit(types.SET_UPDATED_OPTION, option.id);
        }
        commit(types.SET_ATTRIBUTE_OPTION_KEY, option);
    },
    setOptionValueForLanguageCode({
        commit, state,
    }, {
        index, languageCode, value, id,
    }) {
        if (!state.options[index].value || !state.options[index].value[languageCode]) {
            commit(types.SET_OPTION_LANGUAGE_CODE_FOR_VALUE, {
                index,
                languageCode,
            });
        }

        commit(types.SET_OPTION_VALUE_FOR_LANGUAGE_CODE, {
            index,
            languageCode,
            value,
        });

        if (id) {
            commit(types.SET_UPDATED_OPTION, id);
        }
    },
    getAttributeOptionsById({
        commit, rootState,
    }, {
        id,
    }) {
        const params = {
            order: 'ASC',
            field: 'code',
        };
        return this.app.$axios.$get(`${rootState.authentication.user.language}/attributes/${id}/options`, {
            params,
        }).then(options => commit(types.INITIALIZE_OPTIONS, getMappedArrayOptions(options)));
    },
    getAttributeById({
        dispatch, commit, rootState,
    }, {
        id,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            attrTypes,
        } = rootState.dictionaries;

        return this.app.$axios.$get(`${userLanguageCode}/attributes/${id}`).then(({
            code,
            type,
            hint = '',
            label = '',
            groups: groupIds,
            parameters,
            placeholder = '',
            scope,
        }) => {
            commit(types.SET_ATTRIBUTE_ID, id);
            commit(types.SET_ATTRIBUTE_CODE, code);
            commit(types.SET_ATTRIBUTE_TYPE, attrTypes[type]);
            commit(types.SET_ATTRIBUTE_SCOPE, scope);
            commit(types.SET_ATTRIBUTE_GROUPS, groupIds);

            dispatch(
                'translations/setTabTranslations',
                {
                    hint,
                    label,
                    placeholder,
                },
                {
                    root: true,
                },
            );

            if (parameters && type !== TYPES.TEXT_AREA) {
                commit(
                    types.SET_ATTRIBUTE_PARAMETER,
                    getMappedParameterValues(type, parameters, rootState.dictionaries),
                );
            }

            if (type === TYPES.TEXT_AREA) {
                commit(
                    types.SET_ATTRIBUTE_PARAMETER,
                    parameters.rich_edit,
                );
            }
        });
    },
    async updateAttribute(
        {
            state, commit, dispatch, rootState,
        },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const optionsToAddRequests = [
        ];
        const optionsToUpdateRequests = [
        ];

        Object.keys(state.options).forEach((key) => {
            const option = state.options[key];
            const optionValue = option.value || null;

            if (!option.id) {
                optionsToAddRequests.push(
                    this.app.$axios.$post(`${userLanguageCode}/attributes/${id}/options`, {
                        code: option.key,
                        label: optionValue,
                    }).then(({
                        id: optionId,
                    }) => dispatch('updateAttributeOptionKey',
                        {
                            index: key,
                            id: optionId,
                            key: option.key,
                        })),
                );
            } else if (state.updatedOptions[option.id]) {
                optionsToUpdateRequests.push(
                    this.app.$axios.$put(`${userLanguageCode}/attributes/${id}/options/${option.id}`, {
                        code: option.key,
                        label: optionValue,
                    }),
                );
            }
        });

        await this.$setLoader('footerButton');
        await Promise.all([
            ...optionsToAddRequests,
            ...optionsToUpdateRequests,
            this.app.$axios.$put(`${userLanguageCode}/attributes/${id}`, data).catch(e => onError(e.data)),
        ]).then(() => {
            commit(types.REMOVE_UPDATED_OPTION);
            onSuccess();
        });
        await this.$removeLoader('footerButton');
    },
    removeAttribute({
        state, rootState,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/attributes/${id}`).then(() => onSuccess());
    },
    clearStorage({
        commit,
    }) {
        commit(types.CLEAR_STATE);
    },
};
