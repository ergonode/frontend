/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DatePicker
        :value="value"
        :input="{ type: 'number' }"
        :hint="hint"
        :format="format"
        :placeholder="placeholder"
        :label="label"
        :error-messages="errorMessages"
        @input="onValueChange" />
</template>

<script>
import DatePicker from '@UI/components/DatePicker/DatePicker';

export default {
    name: 'AttributePriceFormField',
    components: {
        DatePicker,
    },
    props: {
        value: {
            type: Date,
            default: null,
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
                value,
                languageCode: this.languageCode,
            });
        },
    },
};
</script>
