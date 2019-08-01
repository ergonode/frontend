/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DatePicker
        :value="parsedDate"
        solid
        :placeholder="parameters.format"
        :format="parameters.format"
        :error-messages="errorMessages"
        :dismissible="false"
        autofocus
        multiselect
        @focus="onFocusChange"
        @input="onValueChange" />
</template>

<script>
import moment from 'moment';
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
    },
    data() {
        return {
            localValue: null,
        };
    },
    created() {
        if (this.value) {
            this.localValue = moment(this.value, this.parameters.format).toDate();
        }
    },
    computed: {
        parsedDate() {
            if (!this.value) return null;

            return moment(this.value, this.parameters.format).toDate();
        },
    },
    methods: {
        onFocusChange(isFocused) {
            this.$emit('focus', isFocused);
        },
        onValueChange(date) {
            if (date) this.$emit('input', this.formatDate(date));
            else this.$emit('input', '');
        },
        formatDate(date) {
            if (!date) return null;
            const { format } = this.parameters;

            return moment(date).format(format);
        },
    },
};
</script>
