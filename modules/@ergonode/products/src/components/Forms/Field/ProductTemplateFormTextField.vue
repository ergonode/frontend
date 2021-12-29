/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position">
        <TextField
            :value="localValue"
            :label="label"
            :placeholder="properties.placeholder"
            :error-messages="errors[fieldKey]"
            :required="properties.required"
            :disabled="disabled"
            @focus="onFocus"
            @input="onValueChange">
            <template #append>
                <TextFieldSuffix
                    v-if="parameter"
                    :suffix="parameter" />
                <InfoHint
                    v-if="properties.hint"
                    :hint="properties.hint" />
            </template>
            <template #details>
                <div />
            </template>
        </TextField>
    </ProductTemplateFormField>
</template>

<script>
import ProductTemplateFormField from '@Products/components/Forms/Field/ProductTemplateFormField';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormTextField',
    components: {
        ProductTemplateFormField,
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
            if (typeof this.changedValues[this.fieldKey] !== 'undefined') {
                return this.changedValues[this.fieldKey];
            }

            const {
                attribute_code,
            } = this.properties;

            return this.drafts[this.languageCode][attribute_code];
        },
        parameter() {
            if (!this.properties.parameters) return null;

            const [
                key,
            ] = Object.keys(this.properties.parameters);

            return this.properties.parameters[key];
        },
        fieldKey() {
            return `${this.properties.attribute_code}/${this.languageCode}`;
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
            if (!isFocused && this.fieldData !== this.localValue) {
                this.$emit('input', {
                    fieldKey: this.fieldKey,
                    languageCode: this.languageCode,
                    productId: this.$route.params.id,
                    elementId: this.properties.attribute_id,
                    code: this.properties.attribute_code,
                    value: this.localValue,
                });
            }
        },
        onValueChange(value) {
            this.localValue = value;
        },
    },
};
</script>
