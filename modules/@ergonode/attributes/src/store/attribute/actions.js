/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SKU_MODEL,
    TYPES,
} from '@Attributes/defaults/attributes';
import {
    getMappedArrayOptions,
    getMappedParameterValues,
    getParsedParameterKeys,
} from '@Attributes/models/attributeMapper';
import {
    getParamsOptionsForType,
} from '@Attributes/models/attributeTypes';
import {
    create,
    createOption,
    get,
    getAll,
    getOption,
    remove,
    removeOption,
    update,
    updateOption,
} from '@Attributes/services/attribute';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getMappedTranslationArrayOptions,
} from '@Core/models/mappers/translationsMapper';
import {
    getKeyByValue,
    isEmpty,
} from '@Core/models/objectWrapper';

import {
    types,
} from './mutations';

export default {
    async createAttribute({
        state, rootState,
    }) {
        const {
            code,
            groups,
            type,
            scope,
            parameter,
            options,
        } = state;
        const {
            attrTypes,
        } = rootState.dictionaries;
        const typeKey = type ? getKeyByValue(attrTypes, type) : null;
        const data = {
            code,
            scope,
            type: typeKey,
            groups,
        };

        if (!isEmpty(options)) {
            const optionKeys = Object.keys(options);
            const uniqueOptions = new Set(optionKeys);

            if (optionKeys.some(key => key === '')) {
                this.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Options cannot have an empty keys',
                });
            }

            if (optionKeys.length !== uniqueOptions.size) {
                this.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Option code must be unique',
                });
            }
        }

        if (parameter && type !== TYPES.TEXT_AREA) {
            const paramsOptions = getParamsOptionsForType(typeKey, rootState.dictionaries);
            let paramKey = null;

            // TODO:(DICTIONARY_TYPE) remove condition when dictionary data consistency
            if (Array.isArray(paramsOptions)) {
                paramKey = paramsOptions.find(option => option.name === parameter).id;
            } else {
                paramKey = getKeyByValue(paramsOptions, parameter);
            }

            data.parameters = getParsedParameterKeys({
                selectedType: typeKey,
                selectedParam: paramKey,
            });
        }

        if (typeKey === TYPES.TEXT_AREA) {
            data.parameters = {
                richEdit: parameter,
            };
        }

        const {
            id,
        } = await create({
            $axios: this.app.$axios,
            data,
        });

        await Promise.all(
            Object.keys(options).map(key => createOption({
                $axios: this.app.$axios,
                id,
                data: {
                    code: options[key].key,
                },
            })),
        );

        return {
            id,
        };
    },
    getAttributesByFilter({
        rootState,
    }, {
        filter,
    }) {
        const {
            language,
        } = rootState.authentication.user;

        return getAll({
            $axios: this.app.$axios,
            params: {
                limit: 9999,
                offset: 0,
                filter,
                view: 'list',
                field: 'name',
                order: 'ASC',
            },
        }).then(({
            collection,
        }) => getMappedTranslationArrayOptions({
            options: collection,
            languageCode: language,
        }));
    },
    getAttributesOptionsByType({
        rootState,
    }, {
        type,
    }) {
        const {
            language,
        } = rootState.authentication.user;
        const filter = `type=${type}`;

        return getAll({
            $axios: this.app.$axios,
            params: {
                limit: 9999,
                offset: 0,
                filter,
                view: 'list',
                field: 'name',
                order: 'ASC',
            },
        }).then(({
            collection,
        }) => {
            const options = collection.map(element => ({
                id: element.id,
                key: element.code,
                value: element.name,
                hint: element.name ? `#${element.code} ${language}` : '',
            }));

            // TODO: Temporary till BE will create SKU as an attribute
            if (type === TYPES.TEXT) {
                options.push(SKU_MODEL);
            }

            return {
                options,
            };
        });
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
            dispatch('removeOption', {
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
    removeOption({
        commit,
        state,
    }, {
        id, index,
    }) {
        return removeOption({
            $axios: this.app.$axios,
            attributeId: state.id,
            optionId: id,
        }).then(() => commit(types.REMOVE_ATTRIBUTE_OPTION_KEY, index));
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
    getAttributeOptions({
        commit,
    }, {
        id,
    }) {
        return getOption({
            $axios: this.app.$axios,
            id,
        }).then(options => commit(types.INITIALIZE_OPTIONS, getMappedArrayOptions(options)));
    },
    getAttribute({
        dispatch, commit, rootState,
    }, {
        id,
    }) {
        const {
            attrTypes,
        } = rootState.dictionaries;

        return get({
            $axios: this.app.$axios,
            id,
        }).then(({
            code,
            type,
            hint = '',
            label = '',
            groups: groupIds,
            parameters,
            placeholder = '',
            scope,
        }) => {
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            commit('__SET_STATE', {
                key: 'scope',
                value: scope,
            });
            commit('__SET_STATE', {
                key: 'groups',
                value: groupIds,
            });
            commit('__SET_STATE', {
                key: 'type',
                value: attrTypes[type],
            });

            dispatch(
                'tab/setTranslations',
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
                commit('__SET_STATE', {
                    key: 'parameter',
                    value: getMappedParameterValues(type, parameters, rootState.dictionaries),
                });
            }

            if (type === TYPES.TEXT_AREA) {
                commit('__SET_STATE', {
                    key: 'parameter',
                    value: parameters.rich_edit,
                });
            }
        });
    },
    async updateAttribute(
        {
            state,
            commit,
            dispatch,
        },
        {
            id,
            data,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        const optionsToAddRequests = [];
        const optionsToUpdateRequests = [];

        Object.keys(state.options).forEach((key) => {
            const option = state.options[key];
            const optionValue = option.value || null;

            if (!option.id) {
                optionsToAddRequests.push(
                    createOption({
                        $axios: this.app.$axios,
                        id,
                        data: {
                            code: option.key,
                            label: optionValue,
                        },
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
                    updateOption({
                        $axios: this.app.$axios,
                        attributeId: id,
                        optionId: option.id,
                        data: {
                            code: option.key,
                            label: optionValue,
                        },
                    }),
                );
            }
        });

        await Promise.all([
            ...optionsToAddRequests,
            ...optionsToUpdateRequests,
            update({
                $axios: this.app.$axios,
                id,
                data,
            }).catch(e => onError(e.data)),
        ]).then(() => {
            commit(types.REMOVE_UPDATED_OPTION);
            onSuccess();
        });
    },
    removeAttribute({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        return remove({
            $axios: this.app.$axios,
            id,
        }).then(() => onSuccess());
    },
};
