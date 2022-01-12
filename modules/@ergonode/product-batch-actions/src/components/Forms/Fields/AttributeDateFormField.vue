/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DatePicker
        :value="parsedValue"
        :input="{ type: 'number' }"
        :hint="hint"
        :format="format"
        :placeholder="placeholder"
        :label="label"
        :error-messages="errorMessages"
        @focus="onFocus"
        @input="onValueChange" />
</template>

<script>
import {
    DEFAULT_FORMAT,
} from '@UI/models/calendar';
import {
    format as formatDate,
    parse as parseDate,
} from 'date-fns';

export default {
    name: 'AttributePriceFormField',
    props: {
        value: {
            type: String,
            default: '',
        },
        attribute: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            required: true,
        },
        errorMessages: {
            type: String,
            default: '',
        },
    },
    computed: {
        parsedValue() {
            if (!this.value) {
                return null;
            }

            return parseDate(this.value, DEFAULT_FORMAT, new Date());
        },
        label() {
            return this.attribute.label[this.languageCode] || `#${this.attribute.code}`;
        },
        placeholder() {
            return this.attribute.placeholder[this.languageCode];
        },
        hint() {
            return this.attribute.hint[this.languageCode];
        },
        format() {
            if (!(this.attribute.parameters && this.attribute.parameters.format)) {
                return DEFAULT_FORMAT;
            }

            return this.attribute.parameters.format;
        },
    },
    mounted() {
        this.onValueChange(null);
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', {
                key: this.attribute.id,
                value: value ? formatDate(value, DEFAULT_FORMAT) : '',
                languageCode: this.languageCode,
            });
        },
        onFocus(isFocused) {
            if (!isFocused) {
                this.$emit('blur', {
                    key: this.attribute.id,
                    value: this.value,
                    languageCode: this.languageCode,
                });
            }
        },
    },
};
</script>
