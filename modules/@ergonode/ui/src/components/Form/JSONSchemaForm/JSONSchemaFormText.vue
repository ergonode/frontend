/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="localValue"
        :size="schema.size"
        :label="schema.title"
        :required="schema.isRequired"
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
    data() {
        return {
            localValue: '',
        };
    },
    created() {
        this.localValue = this.value;
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;
            this.$emit('input', value);
        },
    },
};
</script>
