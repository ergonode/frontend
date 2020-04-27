/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="localValue"
        solid
        :regular="!schema.small"
        :small="schema.small"
        :label="schema.title"
        :required="schema.isRequired"
        :error-messages="errorMessages"
        @input="onValueChange" />
</template>

<script>
import TextField from '@Core/components/Inputs/TextField';

export default {
    name: 'JSONSchemaFormText',
    components: {
        TextField,
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
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
