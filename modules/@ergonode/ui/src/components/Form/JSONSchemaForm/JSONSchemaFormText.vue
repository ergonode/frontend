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
        :required="schema.isRequired"
        :hint="schema.description"
        :error-messages="errorMessages"
        @input="onValueChange" />
</template>

<script>
import TextField from '@UI/components/TextField/TextField';

export default {
    name: 'JSONSchemaFormText',
    components: {
        TextField,
    },
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
