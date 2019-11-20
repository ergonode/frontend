/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DatePicker
        :style="{width: `${fixedWidth}px`, height: `${fixedHeight}px`}"
        :value="parsedDate"
        solid
        regular
        :placeholder="parameters.format"
        :format="parameters.format"
        :error-messages="errorMessages"
        :dismissible="false"
        autofocus
        @focus="onFocus"
        @input="onValueChange" />
</template>

<script>
import { format as formatDate, parse as parseDate } from 'date-fns';
import DatePicker from '~/components/Inputs/Date/DatePicker';

export default {
    name: 'GridEditDateCell',
    components: {
        DatePicker,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        errorMessages: {
            type: [String, Array],
            required: false,
            default: '',
        },
        parameters: {
            type: Object,
            required: true,
        },
        fixedHeight: {
            type: Number,
            required: true,
        },
        fixedWidth: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            localValue: null,
        };
    },
    created() {
        if (this.value) {
            this.localValue = parseDate(this.value, this.parameters.format, new Date());
        }
    },
    computed: {
        parsedDate() {
            if (!this.value) return null;

            return parseDate(this.value, this.parameters.format, new Date());
        },
    },
    methods: {
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onValueChange(date) {
            if (date) this.$emit('input', this.formatDate(date));
            else this.$emit('input', '');
        },
        formatDate(date) {
            if (!date) return null;
            const { format } = this.parameters;

            return formatDate(date, format);
        },
    },
};
</script>
