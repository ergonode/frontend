/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="parsedDate"
        :solid="solid"
        :underline="underline"
        :left-alignment="leftAlignment"
        :center-alignment="centerAlignment"
        :label="label"
        :placeholder="placeholder"
        :error-messages="errorMessages"
        :hint="hint"
        :required="required"
        :autofocus="autofocus"
        :disabled="disabled"
        :dismissible="false"
        :small="small"
        :regular="regular"
        :fixed-content-width="false"
        clearable
        @focus="onFocus"
        @input="onValueChange">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #append>
            <slot name="append" />
        </template>
        <template #selectContent>
            <DatePickerContent
                :value="value"
                @input="onValueChange" />
        </template>
        <template #footer="{ clear, apply }">
            <SelectContentApplyFooter
                @clear="clear"
                @apply="apply" />
        </template>
    </Select>
</template>

<script>
import { format as formatDate } from 'date-fns';
import Select from '~/components/Inputs/Select/Select';

export default {
    name: 'DatePicker',
    components: {
        Select,
        DatePickerContent: () => import('~/components/Inputs/Date/DatePickerContent'),
        SelectContentApplyFooter: () => import('~/components/Inputs/Select/Contents/Footers/SelectContentApplyFooter'),
    },
    props: {
        value: {
            type: Date,
            default: null,
        },
        format: {
            type: String,
            default: 'YY-MM-DD',
        },
        solid: {
            type: Boolean,
            default: false,
        },
        underline: {
            type: Boolean,
            default: false,
        },
        leftAlignment: {
            type: Boolean,
            default: false,
        },
        centerAlignment: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: null,
        },
        errorMessages: {
            type: [String, Array],
            default: '',
        },
        hint: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
        regular: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        parsedDate() {
            if (!this.value) return null;

            return this.formatDate(this.value);
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value === '' ? null : value);
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        formatDate(date) {
            if (!date) return null;

            return formatDate(date, this.format);
        },
    },
};
</script>
