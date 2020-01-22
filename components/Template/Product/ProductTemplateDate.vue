/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DatePicker
        :value="localValue"
        solid
        regular
        clearable
        :label="label"
        :placeholder="parameters.format"
        :format="parameters.format"
        :error-messages="errorMessages"
        :required="required"
        :disabled="disabled"
        @focus="onFocusChange"
        @input="onValueChange" />
</template>

<script>
import { format as formatDate, parse as parseDate } from 'date-fns';
import productTemplateElementMixin from '~/mixins/product/productTemplateElementMixin';
import DatePicker from '~/core/components/Inputs/DatePicker/DatePicker';
import { DEFAULT_FORMAT } from '~/model/calendar/calendar';

export default {
    name: 'ProductTemplateDate',
    mixins: [productTemplateElementMixin],
    components: {
        DatePicker,
    },
    data() {
        return {
            isFocused: false,
        };
    },
    created() {
        if (!this.value) this.localValue = null;
        else this.localValue = parseDate(this.value, DEFAULT_FORMAT, new Date());
    },
    methods: {
        onFocusChange(isFocused) {
            this.isFocused = isFocused;
        },
        onValueChange(date) {
            this.localValue = date;

            this.debounceFunc(formatDate(date, DEFAULT_FORMAT));
        },
    },
};
</script>
