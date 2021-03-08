/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadFiles
        :value="value"
        height="216px"
        :label="label"
        :error-messages="errorMessages"
        @focus="onFocus"
        @input="onValueChange" />
</template>

<script>
import UploadFiles from '@Media/components/Inputs/UploadFile/UploadFiles';

export default {
    name: 'AttributeFileFormField',
    components: {
        UploadFiles,
    },
    props: {
        value: {
            type: Array,
            default: () => [],
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
    },
    mounted() {
        this.onValueChange([]);
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
