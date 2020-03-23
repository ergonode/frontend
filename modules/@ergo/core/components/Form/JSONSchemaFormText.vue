/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="localValue"
        solid
        regular
        :label="title"
        :error-messages="errorMessage"
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
        title: {
            type: String,
            default: '',
        },
        errorMessage: {
            type: String,
            default: '',
        },
        default: {
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
        this.localValue = this.default;
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;
            this.$emit('input', value);
        },
    },
};
</script>
