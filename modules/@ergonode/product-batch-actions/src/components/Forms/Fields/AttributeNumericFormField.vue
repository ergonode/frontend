/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="value"
        :input="{ type: 'number' }"
        :hint="hint"
        :placeholder="placeholder"
        :label="label"
        :error-messages="errorMessages"
        @focus="onFocus"
        @input="onValueChange" />
</template>

<script>

export default {
    name: 'AttributeNumericFormField',
    props: {
        value: {
            type: [
                String,
                Number,
            ],
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
        label() {
            return this.attribute.label[this.languageCode] || `#${this.attribute.code}`;
        },
        placeholder() {
            return this.attribute.placeholder[this.languageCode];
        },
        hint() {
            return this.attribute.hint[this.languageCode];
        },
    },
    mounted() {
        this.onValueChange('');
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', {
                key: this.attribute.id,
                value,
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
