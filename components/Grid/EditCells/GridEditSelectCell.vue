/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="value"
        solid
        small
        clearable
        :multiselect="multiselect"
        :dismissible="false"
        :error-messages="errorMessages"
        autofocus
        :style="{width: `${fixedWidth}px`}"
        @focus="onFocus"
        @input="onValueChange"
        @apply="onApply">
        <template v-slot:selectContent>
            <TranslationMultiselectListContent
                v-if="multiselect"
                :options="options"
                :selected-options="value || []"
                @values="onValueChange" />
            <TranslationSelectListContent
                v-else
                :options="options"
                :selected-option="value"
                @value="onValueChange" />
        </template>
    </Select>
</template>

<script>
import Select from '~/components/Inputs/Select/Select';
import TranslationSelectListContent from '~/components/Inputs/Select/Contents/TranslationSelectListContent';
import TranslationMultiselectListContent from '~/components/Inputs/Select/Contents/TranslationMultiselectListContent';

export default {
    name: 'GridEditSelectCell',
    components: {
        Select,
        TranslationSelectListContent,
        TranslationMultiselectListContent,
    },
    props: {
        value: {
            type: [Array, String],
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
    },
    methods: {
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onApply() {
            this.$emit('focus', false);
        },
        onValueChange(value) {
            if (value) {
                this.$emit('input', Array.isArray(value) ? value : value.key);
            } else {
                this.$emit('input', value);
            }
        },
    },
};
</script>
