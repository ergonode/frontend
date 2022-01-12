/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <RichTextEditor
        v-if="isRichEdit"
        :value="value"
        height="150px"
        resize="none"
        :hint="hint"
        :placeholder="placeholder"
        :label="label"
        :error-messages="errorMessages"
        @blur="onBlur"
        @focus="onFocus"
        @input="onValueChange" />
    <TextArea
        v-else
        :value="value"
        height="150px"
        resize="none"
        :hint="hint"
        :placeholder="placeholder"
        :label="label"
        :error-messages="errorMessages"
        @blur="onBlur"
        @focus="onFocus"
        @input="onValueChange" />
</template>

<script>
export default {
    name: 'AttributeTextAreaFormField',
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
        label() {
            return this.attribute.label[this.languageCode] || `#${this.attribute.code}`;
        },
        placeholder() {
            return this.attribute.placeholder[this.languageCode];
        },
        hint() {
            return this.attribute.hint[this.languageCode];
        },
        isRichEdit() {
            const {
                parameters = {},
            } = this.attribute;

            return parameters.rich_edit;
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
        onBlur(value) {
            if (this.isRichEdit) {
                this.$emit('input', {
                    key: this.attribute.id,
                    value,
                    languageCode: this.languageCode,
                });
                this.$emit('blur', {
                    key: this.attribute.id,
                    value,
                    languageCode: this.languageCode,
                });
            }
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
