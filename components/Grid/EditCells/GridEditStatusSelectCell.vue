/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :style="{width: `${fixedWidth}px`}"
        :value="value"
        solid
        clearable
        :dismissible="false"
        :error-messages="errorMessages"
        autofocus
        :options="options"
        @focus="onFocus"
        @input="onValueChange"
        @apply="onApply">
        <template #selectContent>
            <StatusSelectListContent
                :options="options"
                :selected-option="value"
                :colors="colors"
                @value="onValueChange" />
        </template>
    </Select>
</template>

<script>
import Select from '~/components/Inputs/Select/Select';
import StatusSelectListContent from '~/components/Inputs/Select/Contents/StatusSelectListContent';

export default {
    name: 'GridEditStatusSelectCell',
    components: {
        Select,
        StatusSelectListContent,
    },
    props: {
        value: {
            type: String,
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
        colors: {
            type: Object,
            required: true,
        },
        fixedWidth: {
            type: Number,
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
            this.$emit('input', value.key || value);
        },
    },
};
</script>
