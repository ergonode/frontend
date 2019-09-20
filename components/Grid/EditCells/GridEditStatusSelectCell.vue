/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="value"
        solid
        clearable
        :dismissible="false"
        :error-messages="errorMessages"
        autofocus
        @focus="onFocus"
        @input="onValueChange"
        @apply="onApply" />
</template>

<script>
import Select from '~/components/Inputs/Select/Select';

export default {
    name: 'GridEditStatusSelectCell',
    components: {
        Select,
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
        errorMessages: {
            type: [String, Array],
            default: '',
        },
        options: {
            type: Array,
            required: true,
        },
    },
    methods: {
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onApply() {
            this.$emit('focus', false);
        },
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
