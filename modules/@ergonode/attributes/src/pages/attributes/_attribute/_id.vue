/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributePage
        :title="code"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import {
    typesConfiguration,
} from '@Attributes/models/attributeTypes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    getKeyByValue,
    isEmpty,
} from '@Core/models/objectWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditAttribute',
    components: {
        AttributePage: () => import('@Attributes/components/Pages/AttributePage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        await Promise.all([
            store.dispatch('attribute/getAttribute', params),
            store.dispatch('attribute/getAttributeOptions', params),
        ]);
    },
    computed: {
        ...mapState('attribute', {
            id: state => state.id,
            groups: state => state.groups,
            code: state => state.code,
            type: state => state.type,
            scope: state => state.scope,
            parameter: state => state.parameter,
            options: state => state.options,
        }),
        ...mapState('tab', {
            translations: state => state.translations,
        }),
        ...mapState('dictionaries', {
            attrTypes: state => state.attrTypes,
        }),
    },
    destroyed() {
        this.__clearStorage();
        this.clearTranslationsStorage();
        this.removeErrors();
    },
    methods: {
        ...mapActions('attribute', [
            'updateAttribute',
            'removeAttribute',
            '__clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        ...mapActions('tab', {
            clearTranslationsStorage: '__clearStorage',
        }),
        onUpdateAttributeSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Attribute updated',
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Attribute removed',
            });
            this.$router.push({
                name: 'attributes-grid',
            });
        },
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this attribute?',
                confirmCallback: () => this.removeAttribute({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
        onSave() {
            this.removeErrors();
            const typeKey = getKeyByValue(this.attrTypes, this.type);
            const {
                label, placeholder, hint,
            } = this.translations;
            const data = {
                groups: this.groups,
                scope: this.scope,
                label,
                hint,
                placeholder,
            };

            if (!isEmpty(this.options)) {
                const errors = {};

                Object.keys(this.options).forEach((optionKey) => {
                    const fieldKey = `option_${optionKey}`;
                    const duplications = Object.values(this.options)
                        .filter(({
                            key,
                        }) => key === this.options[optionKey].key);

                    if (duplications.length > 1) {
                        errors[fieldKey] = [
                            'Option code must be unique',
                        ];
                    }
                    if (!this.options[optionKey].key) {
                        errors[fieldKey] = [
                            'Option cannot be empty',
                        ];
                    }
                });

                if (!isEmpty(errors)) {
                    this.onError({
                        errors,
                    });
                    return;
                }
            }

            if (this.parameter && typeKey !== TYPES.TEXT_AREA) {
                let paramKey = null;
                const typesConfig = typesConfiguration.call(this);
                const paramsOptions = typesConfig.getParamsOptionsForType(typeKey);

                // TODO:(DICTIONARY_TYPE) remove condition when dictionary data consistency
                if (Array.isArray(paramsOptions)) {
                    paramKey = paramsOptions.find(option => option.name === this.parameter).id;
                } else {
                    paramKey = getKeyByValue(paramsOptions, this.parameter);
                }

                data.parameters = typesConfig.getParsedParameterKeys(typeKey, paramKey);
            }

            if (typeKey === TYPES.TEXT_AREA) {
                data.parameters = {
                    richEdit: this.parameter,
                };
            }

            this.updateAttribute({
                id: this.id,
                data,
                onSuccess: this.onUpdateAttributeSuccess,
                onError: this.onError,
            });
        },
    },
    head() {
        return {
            title: `${this.code} - Attributes - Ergonode`,
        };
    },
};
</script>
