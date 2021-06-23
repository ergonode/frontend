/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadImageFile
        :value="value"
        height="216px"
        :label="label"
        :error-messages="errorMessages"
        @input="onValueChange" />
</template>

<script>
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';

export default {
    name: 'AttributeImageFormField',
    components: {
        UploadImageFile,
    },
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

            this.$emit('blur', {
                key: this.attribute.id,
                value,
                languageCode: this.languageCode,
            });
        },
    },
};
</script>
