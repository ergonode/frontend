/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="value"
        :size="schema.size"
        :label="schema.title"
        :disabled="schema.disabled"
        :required="required"
        :hint="schema.description"
        :error-messages="errorMessages"
        @input="onValueChange" />
</template>

<script>

export default {
    name: 'JSONSchemaFormText',
    props: {
        /**
         * JSON schema
         */
        schema: {
            type: Object,
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given field is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * The error messages are messages which comes from validation process
         */
        errorMessages: {
            type: String,
            default: '',
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
