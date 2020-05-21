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

import { mapState, mapActions } from 'vuex';
import { isEmpty, getKeyByValue } from '@Core/models/objectWrapper';
import { getParsedParameterKeys } from '@Attributes/models/attributeMapper';
import { getParamsOptionsForType } from '@Attributes/models/attributeTypes';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'EditAttribute',
    components: {
        AttributePage: () => import('@Attributes/components/Pages/AttributePage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({ store, params }) {
        await Promise.all([
            store.dispatch('attribute/getAttributeById', { id: params.id }),
            store.dispatch('attribute/getAttributeOptionsById', { id: params.id }),
        ]);
    },
    computed: {
        ...mapState('attribute', {
            id: state => state.id,
            groups: state => state.groups,
            code: state => state.code,
            type: state => state.type,
            parameter: state => state.parameter,
            options: state => state.options,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('dictionaries', {
            attrTypes: state => state.attrTypes,
        }),
    },
    destroyed() {
        this.clearStorage();
        this.clearTranslationsStorage();
        this.removeValidationErrors();
    },
    methods: {
        ...mapActions('attribute', [
            'updateAttribute',
            'removeAttribute',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        ...mapActions('translations', {
            clearTranslationsStorage: 'clearStorage',
        }),
        onUpdateAttributeSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Attribute updated' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Attribute removed' });
            this.$router.push({ name: 'attributes-grid' });
        },
        onRemove() {
            const isConfirmed = confirm('Are you sure you want to delete this attribute?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirmed) {
                this.removeAttribute({
                    onSuccess: this.onRemoveSuccess,
                });
            }
        },
        onSave() {
            this.removeValidationErrors();
            const typeKey = getKeyByValue(this.attrTypes, this.type);
            const { label, placeholder, hint } = this.translations;
            const data = {
                groups: this.groups,
                label,
                hint,
                placeholder,
            };

            if (!isEmpty(this.options)) {
                const preValidationErrors = {};

                Object.keys(this.options).forEach((optionKey) => {
                    const fieldKey = `option_${optionKey}`;
                    const dupications = Object.values(this.options)
                        .filter(({ key }) => key === this.options[optionKey].key);

                    if (dupications.length > 1) {
                        preValidationErrors[fieldKey] = ['Option code must be unique'];
                    }
                    if (!this.options[optionKey].key) {
                        preValidationErrors[fieldKey] = ['Option cannot be empty'];
                    }
                });

                if (!isEmpty(preValidationErrors)) {
                    this.onError({ errors: preValidationErrors });
                    return;
                }
            }

            if (this.parameter) {
                let paramKey = null;
                const paramsOptions = getParamsOptionsForType(
                    typeKey,
                    this.$store.state.dictionaries,
                );

                // TODO:(DICTIONARY_TYPE) remove condition when dictionary data consistency
                if (Array.isArray(paramsOptions)) {
                    paramKey = paramsOptions.find(option => option.name === this.parameter).id;
                } else {
                    paramKey = getKeyByValue(paramsOptions, this.parameter);
                }

                data.parameters = getParsedParameterKeys({
                    selectedType: typeKey,
                    selectedParam: paramKey,
                });
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
