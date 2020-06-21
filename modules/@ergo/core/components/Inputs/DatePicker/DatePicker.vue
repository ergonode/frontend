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
        :small="small"
        :regular="regular"
        :fixed-content="false"
        :dismissible="false"
        clearable
        @focus="onFocus"
        @input="onValueChange">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #append>
            <slot name="append" />
        </template>
        <template #dropdown="{ onSelectValueCallback }">
            <DatePickerContent
                :value="value"
                @input="onSelectValueCallback" />
        </template>
        <template #footer="{ clear, apply }">
            <SelectDropdownApplyFooter
                @clear="clear"
                @apply="apply" />
        </template>
    </Select>
</template>

<script>
import DatePickerContent from '@Core/components/Inputs/DatePicker/DatePickerContent';
import SelectDropdownApplyFooter from '@Core/components/Inputs/Select/DropDown/Footers/SelectDropdownApplyFooter';
import Select from '@Core/components/Inputs/Select/Select';
import { DEFAULT_FORMAT } from '@Core/models/calendar/calendar';
import { format as formatDate } from 'date-fns';

export default {
    name: 'DatePicker',
    components: {
        Select,
        DatePickerContent,
        SelectDropdownApplyFooter,
    },
    props: {
        value: {
            type: Date,
            default: null,
        },
        format: {
            type: String,
            default: DEFAULT_FORMAT,
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
            type: String,
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

            return formatDate(this.value, this.format);
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value === '' ? null : value);
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
    },
};
</script>
