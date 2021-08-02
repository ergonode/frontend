/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="parsedDate"
        :label="label"
        :type="type"
        :alignment="alignment"
        :size="size"
        :placeholder="placeholder"
        :error-messages="errorMessages"
        :hint="hint"
        :required="required"
        :autofocus="autofocus"
        :disabled="disabled"
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
        <template
            #dropdown="{
                onSelectValue,
                onClear,
                onApply,
            }">
            <DatePickerContent
                :value="value"
                :format="format"
                :disabled-past="disabledPast"
                @input="onSelectValue" />
            <SelectDropdownApplyFooter
                @clear="onClear"
                @apply="onApply" />
        </template>
    </Select>
</template>

<script>
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import DatePickerContent from '@UI/components/DatePicker/DatePickerContent';
import SelectDropdownApplyFooter from '@UI/components/Select/Dropdown/Footers/SelectDropdownApplyFooter';
import {
    DEFAULT_FORMAT,
} from '@UI/models/calendar';
import {
    format as formatDate,
} from 'date-fns';

export default {
    name: 'DatePicker',
    components: {
        DatePickerContent,
        SelectDropdownApplyFooter,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Date,
            default: null,
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * Alignment of selected value, might be centered or from left
         */
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        /**
         * Determines style of component based on type
         */
        type: {
            type: String,
            default: INPUT_TYPE.SOLID,
            validator: value => Object.values(INPUT_TYPE).indexOf(value) !== -1,
        },
        /**
         * Date format used for parsing value
         */
        format: {
            type: String,
            default: DEFAULT_FORMAT,
        },
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: null,
        },
        /**
         * The placeholder is a helper text for the component
         */
        placeholder: {
            type: String,
            default: null,
        },
        /**
         * The error messages are messages which comes from validation process
         */
        errorMessages: {
            type: String,
            default: '',
        },
        /**
         *  The hint is a tip for the component
         */
        hint: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given component is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if component should be focused as it's initialised
         */
        autofocus: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines whether to exclude past dates
         */
        disabledPast: {
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
