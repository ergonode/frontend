/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DatePicker
        :value="value"
        :input="{ type: 'number' }"
        :hint="hint"
        :placeholder="placeholder"
        :label="label"
        @input="onValueChange">
        <template #append>
            <TextFieldSuffix :suffix="format" />
        </template>
    </DatePicker>
</template>

<script>
import DatePicker from '@UI/components/DatePicker/DatePicker';
import TextFieldSuffix from '@UI/components/TextField/TextFieldSuffix';

export default {
    name: 'AttributePriceFormField',
    components: {
        DatePicker,
        TextFieldSuffix,
    },
    props: {
        value: {
            type: Object,
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
