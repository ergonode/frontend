/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="component"
        :value="value"
        height="150px"
        resize="none"
        :hint="hint"
        :placeholder="placeholder"
        :label="label"
        @input="onValueChange" />
</template>

<script>
import RichTextEditor from '@UI/components/RichTextEditor/RichTextEditor';
import TextArea from '@UI/components/TextArea/TextArea';

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
    },
    computed: {
        component() {
            const {
                parameters = {},
            } = this.attribute;

            return parameters.rich_edit ? RichTextEditor : TextArea;
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
