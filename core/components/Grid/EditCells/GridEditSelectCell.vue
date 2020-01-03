/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationSelect
        :style="{width: `${fixedWidth}px`, height: `${fixedHeight}px`}"
        :value="value"
        :solid="true"
        :small="true"
        :clearable="true"
        :autofocus="true"
        :multiselect="multiselect"
        :dismissible="false"
        :error-messages="errorMessages"
        :options="options"
        @focus="onFocus"
        @input="onValueChange" />
</template>

<script>
import TranslationSelect from '~/core/components/Inputs/Select/TranslationSelect';

export default {
    name: 'GridEditSelectCell',
    components: {
        TranslationSelect,
    },
    props: {
        value: {
            type: [Array, Object],
            required: true,
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
