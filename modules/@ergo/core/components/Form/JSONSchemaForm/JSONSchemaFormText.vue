/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="localValue"
        solid
        :regular="!$attrs.small"
        :small="$attrs.small"
        :label="$attrs.title"
        :required="$attrs.isRequired"
        :error-messages="$attrs.errorMessages"
        @input="onValueChange" />
</template>

<script>
import TextField from '@Core/components/Inputs/TextField';

export default {
    name: 'JSONSchemaFormText',
    components: {
        TextField,
    },
    inheritAttrs: false,
    data() {
        return {
            localValue: '',
        };
    },
    created() {
        this.localValue = this.$attrs.value;
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;
            this.$emit('input', value);
        },
    },
};
</script>
