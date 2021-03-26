/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position">
        <TranslationSelect
            :value="localValue"
            :clearable="true"
            :label="label"
            :options="options"
            :placeholder="properties.placeholder"
            :error-messages="errors[fieldKey]"
            :required="properties.required"
            :disabled="disabled"
            @input="onValueChange"
            @focus="onFocus">
            <template #append>
                <InfoHint
                    v-if="properties.hint"
                    :hint="properties.hint" />
            </template>
            <template #details>
                <div />
            </template>
        </TranslationSelect>
    </ProductTemplateFormField>
</template>

<script>
import {
    getMappedObjectOption,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';
import ProductTemplateFormField from '@Products/components/Forms/Field/ProductTemplateFormField';
import InfoHint from '@UI/components/Hints/InfoHint';
import TranslationSelect from '@UI/components/Select/TranslationSelect';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormSelectField',
    components: {
        ProductTemplateFormField,
        TranslationSelect,
        InfoHint,
    },
    props: {
        size: {
            type: Object,
            default: () => ({}),
        },
        position: {
            type: Object,
            default: () => ({}),
        },
        properties: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
        changedValues: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        languageCode: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            localValue: '',
        };
    },
    computed: {
        ...mapState('product', [
            'drafts',
        ]),
        fieldData() {
            const {
                attribute_code,
            } = this.properties;

            if (!this.hasOptions || !this.drafts[this.languageCode][attribute_code]) {
                return '';
            }

            if (typeof this.changedValues[this.fieldKey] !== 'undefined') {
                return this.changedValues[this.fieldKey];
            }

            const value = this.drafts[this.languageCode][attribute_code];

            return getMappedObjectOption({
                option: {
                    id: value,
                    ...this.properties.options[value],
                },
                languageCode: this.languageCode,
            });
        },
        fieldKey() {
            return `${this.properties.attribute_code}/${this.languageCode}`;
        },
        hasOptions() {
            return typeof this.properties.options !== 'undefined';
        },
        options() {
            if (!this.hasOptions) return [];

            return getMappedObjectOptions({
                options: this.properties.options,
                languageCode: this.languageCode,
            });
        },
    },
    watch: {
        fieldData: {
            immediate: true,
            handler() {
                this.localValue = this.fieldData;
            },
        },
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused && this.fieldData.id !== this.localValue.id) {
                this.$emit('input', {
                    fieldKey: this.fieldKey,
                    languageCode: this.languageCode,
                    productId: this.$route.params.id,
                    elementId: this.properties.attribute_id,
                    code: this.properties.attribute_code,
                    value: this.localValue.id,
                });
            }
        },
        onValueChange(value) {
            this.localValue = value;
        },
    },
};
</script>
