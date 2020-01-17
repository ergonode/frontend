/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DatePicker
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
        else this.localValue = parseDate(this.value, this.parameters.format, new Date());
    },
    methods: {
        onFocusChange(isFocused) {
            this.isFocused = isFocused;
        },
        onValueChange(date) {
            this.localValue = date;

            this.debounceFunc(this.formatDate(date));
        },
        formatDate(date) {
            if (!date) return null;
            const { format } = this.parameters;

            return formatDate(date, format);
        },
    },
};
</script>
