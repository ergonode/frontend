/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position">
        <DatePicker
            :value="localValue"
            :label="label"
            :placeholder="properties.placeholder"
            :foramt="parameter"
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
        </DatePicker>
    </ProductTemplateFormField>
</template>

<script>
import InfoHint from '@Core/components/Hints/InfoHint';
import DatePicker from '@Core/components/Inputs/DatePicker/DatePicker';
import TextFieldSuffix from '@Core/components/Inputs/TextFieldSuffix';
import {
    DEFAULT_FORMAT,
} from '@Core/models/calendar/calendar';
import ProductTemplateFormField from '@Products/components/Form/Field/ProductTemplateFormField';
import {
    format as formatDate,
    isEqual,
} from 'date-fns';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormDateField',
    components: {
        ProductTemplateFormField,
        DatePicker,
        TextFieldSuffix,
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
            'draft',
        ]),
        fieldData() {
            const {
                attribute_code,
            } = this.properties;
            const value = this.draft[this.languageCode][attribute_code];

            return value ? new Date(value) : null;
        },
        parameter() {
            if (!this.properties.parameters) return DEFAULT_FORMAT;

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
        languageCode: {
            immediate: true,
            handler() {
                this.localValue = this.fieldData;
            },
        },
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused && !isEqual(this.fieldData, this.localValue)) {
                this.$emit('input', {
                    fieldKey: this.fieldKey,
                    languageCode: this.languageCode,
                    productId: this.$route.params.id,
                    elementId: this.properties.attribute_id,
                    code: this.properties.attribute_code,
                    value: this.localValue
                        ? formatDate(this.localValue, DEFAULT_FORMAT)
                        : '',
                });
            }
        },
        onValueChange(value) {
            this.localValue = value;
        },
    },
};
</script>
