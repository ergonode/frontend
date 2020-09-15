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
} from '@Attributes/models/attributeMapper';
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
    getMappedTranslationArrayOptions,
} from '@Core/models/mappers/translationsMapper';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';

import {
    types,
} from './mutations';

export default {
    async createAttribute({
        state,
        rootState,
    },
    {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                code,
                groups,
                type,
                scope,
            } = state;
            const {
                attrTypes,
            } = rootState.dictionaries;
            const typeKey = type ? getKeyByValue(attrTypes, type) : null;
            let data = {
                code,
                scope,
                type: typeKey,
                groups,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = this.$extendMethods('@Attributes/store/attribute/action/createAttribute/__before', {
                $this: this,
                type: typeKey,
                data,
            });
            // EXTENDED BEFORE METHOD

            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Attributes/store/attribute/action/createAttribute/__after', {
                $this: this,
                type: typeKey,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            onError(e.data);
        }
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
    async getAttributeOptions({
        commit,
    }, {
        id,
    }) {
        const options = await getOption({
            $axios: this.app.$axios,
            id,
        });

        commit(types.INITIALIZE_OPTIONS, getMappedArrayOptions(options));
    },
    async getAttribute({
        dispatch,
        commit,
        rootState,
    }, {
        id,
    }) {
        const {
            attrTypes,
        } = rootState.dictionaries;

        // EXTENDED BEFORE METHOD
        this.$extendMethods('@Attributes/store/attribute/action/getAttribute/__before', {
            $this: this,
            data: {
                id,
            },
        });
        // EXTENDED BEFORE METHOD

        const data = await get({
            $axios: this.app.$axios,
            id,
        });
        const {
            code,
            type,
            hint = '',
            label = '',
            groups: groupIds,
            placeholder = '',
            scope,
        } = data;

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

        // EXTENDED AFTER METHOD
        this.$extendMethods('@Attributes/store/attribute/action/getAttribute/__after', {
            $this: this,
            data,
            type,
        });
        // EXTENDED AFTER METHOD
    },
    async updateAttribute(
        {
            state,
            rootState,
            commit,
            dispatch,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
                options,
                updatedOptions,
                type,
                groups,
                scope,
            } = state;
            const {
                attrTypes,
            } = rootState.dictionaries;
            const {
                translations: {
                    label, placeholder, hint,
                },
            } = rootState.tab;
            const addOptionsRequests = [];
            const updateOptionsRequests = [];
            const typeKey = getKeyByValue(attrTypes, type);
            const optionKeys = Object.keys(options);
            let data = {
                groups,
                scope,
                label,
                hint,
                placeholder,
            };

            if (optionKeys.length > 0) {
                const optionValues = Object.values(options);
                const errors = {};
                let isAnyError = false;

                optionKeys.forEach((optionKey) => {
                    const fieldKey = `option_${optionKey}`;
                    const duplications = optionValues
                        .filter(({
                            key,
                        }) => key === options[optionKey].key);

                    if (duplications.length > 1) {
                        errors[fieldKey] = [
                            'Option code must be unique',
                        ];
                        isAnyError = true;
                    }
                    if (!options[optionKey].key) {
                        errors[fieldKey] = [
                            'Option cannot be empty',
                        ];
                        isAnyError = true;
                    }
                });

                if (isAnyError) {
                    onError({
                        errors,
                    });
                    return;
                }
            }

            optionKeys.forEach((key) => {
                const option = options[key];
                const optionValue = option.value || null;

                if (!option.id) {
                    addOptionsRequests.push(
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
                } else if (updatedOptions[option.id]) {
                    updateOptionsRequests.push(
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

            // EXTENDED BEFORE METHOD
            const extendedData = this.$extendMethods('@Attributes/store/attribute/action/createAttribute/__before', {
                $this: this,
                type: typeKey,
                data,
            });
            // EXTENDED BEFORE METHOD

            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });

            await Promise.all([
                ...addOptionsRequests,
                ...updateOptionsRequests,
                update({
                    $axios: this.app.$axios,
                    id,
                    data,
                }),
            ]);

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Attributes/store/attribute/action/createAttribute/__after', {
                $this: this,
                type: typeKey,
                data,
            });
            // EXTENDED AFTER METHOD

            commit(types.REMOVE_UPDATED_OPTION);
            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async removeAttribute({
        state, rootState,
    }, {
        onSuccess,
    }) {
        const {
            id,
            type,
        } = state;
        const {
            attrTypes,
        } = rootState.dictionaries;
        const typeKey = getKeyByValue(attrTypes, type);

        // EXTENDED BEFORE METHOD
        await this.$extendMethods('@Attributes/store/attribute/action/removeAttribute/__before', {
            $this: this,
            type: typeKey,
        });
        // EXTENDED BEFORE METHOD

        await remove({
            $axios: this.app.$axios,
            id,
        });

        // EXTENDED AFTER METHOD
        await this.$extendMethods('@Attributes/store/attribute/action/removeAttribute/__after', {
            $this: this,
            type: typeKey,
        });
        // EXTENDED AFTER METHOD
        onSuccess();
    },
};
