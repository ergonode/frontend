/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadProductRelations
        :value="value"
        height="216px"
        :label="label"
        :error-messages="errorMessages"
        @focus="onFocus"
        @input="onValueChange" />
</template>

<script>
import UploadProductRelations from '@Products/components/Inputs/UploadProductRelations';

export default {
    name: 'AttributeProductRelationFormField',
    components: {
        UploadProductRelations,
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

            this.$emit('blur', {
                key: this.attribute.id,
                value,
                languageCode: this.languageCode,
            });
        },
    },
};
</script>
