/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import {
    DEFAULT_FORMAT,
} from '@Core/models/calendar/calendar';
import {
    format as formatDate,
} from 'date-fns';

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
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        type: {
            type: String,
            default: INPUT_TYPE.SOLID,
            validator: value => Object.values(INPUT_TYPE).indexOf(value) !== -1,
        },
        format: {
            type: String,
            default: DEFAULT_FORMAT,
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
