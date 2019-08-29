/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSelectBase
        :value="value"
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
        :dismissible="dismissible"
        :small="small"
        :regular="regular"
        :fixed-select-content="false"
        multiselect
        clearable
        @focus="onFocus"
        @clear="emitValue">
        <template v-slot:prepend>
            <slot name="prepend" />
        </template>
        <input
            slot="input"
            :value="parsedDate"
            :placeholder="placeholder"
            :disabled="disabled"
            :aria-label="label || 'no description'"
            type="text"
            readonly>
        <template v-slot:append>
            <slot name="append" />
        </template>
        <template v-slot:selectContent>
            <slot name="selectContent">
                <DatePickerContent
                    :value="value"
                    @input="emitValue" />
            </slot>
        </template>
    </InputSelectBase>
</template>

<script>
import { format as formatDate } from 'date-fns';
import InputSelectBase from '~/components/Inputs/InputSelectBase';

export default {
    name: 'DatePicker',
    components: {
        InputSelectBase,
        DatePickerContent: () => import('~/components/Inputs/Date/DatePickerContent'),
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
        dismissible: {
            type: Boolean,
            default: true,
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
        emitValue(value) {
            if (Array.isArray(value)) this.$emit('input', null);
            else this.$emit('input', value);
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
