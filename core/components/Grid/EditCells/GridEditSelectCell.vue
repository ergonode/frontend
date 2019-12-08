/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :style="{width: `${fixedWidth}px`, height: `${fixedHeight}px`}"
        :value="value"
        :language-code="languageCode"
        solid
        small
        clearable
        autofocus
        dismissible
        is-list-element-hint
        :multiselect="multiselect"
        :error-messages="errorMessages"
        :options="selectOptions"
        @focus="onFocus"
        @input="onValueChange" />
</template>

<script>
import Select from '~/core/components/Inputs/Select/Select';

export default {
    name: 'GridEditSelectCell',
    components: {
        Select,
    },
    props: {
        value: {
            type: [Array, Object],
            required: true,
        },
        languageCode: {
            type: String,
            default: '',
        },
        multiselect: {
            type: Boolean,
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
        fixedWidth: {
            type: Number,
            required: true,
        },
        fixedHeight: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            selectOptions: [],
        };
    },
    created() {
        this.selectOptions = this.options.map((option) => ({
            id: option.key,
            name: option.value,
        }));
    },
    methods: {
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
