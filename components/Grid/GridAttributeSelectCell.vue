/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="value"
        solid
        clearable
        :multiselect="multiselect"
        :dismissible="!multiselect"
        :error-messages="errorMessages"
        :autofocus="autofocus"
        @focus="onFocus"
        @input="onValueChange"
        @apply="onApply">
        <TranslationMultiselectListContent
            v-if="multiselect"
            slot="selectContent"
            :options="options"
            :selected-options="value || []"
            @values="onValueChange" />
        <TranslationSelectListContent
            v-else
            slot="selectContent"
            :options="options"
            :selected-option="value"
            @value="onValueChange" />
    </Select>
</template>

<script>
import Select from '~/components/Inputs/Select/Select';
import TranslationSelectListContent from '~/components/Inputs/Select/Contents/TranslationSelectListContent';
import TranslationMultiselectListContent from '~/components/Inputs/Select/Contents/TranslationMultiselectListContent';

export default {
    name: 'GridAttributeSelectCell',
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
        autofocus: {
            type: Boolean,
            required: true,
        },
        errorMessages: {
            type: [String, Array],
            required: false,
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
            if (value) {
                this.$emit('input', Array.isArray(value) ? value : value.key);
            } else {
                this.$emit('input', value);
            }
        },
    },
};
</script>
