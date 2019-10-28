/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DatePicker
        :value="localValue"
        solid
        clearable
        :label="label"
        :placeholder="parameters.format"
        :format="parameters.format"
        :error-messages="errorMessages"
        :required="required"
        :disabled="disabled"
        @focus="onFocusChange"
        @input="onValueChange">
        <template #append>
            <ProductTemplateDetailsContent
                :hint="hint"
                :error-messages="errorMessages"
                :is-error="isError">
                <template #append>
                    <IconArrowDropDown :state="dropDownState" />
                </template>
            </ProductTemplateDetailsContent>
        </template>
    </DatePicker>
</template>

<script>
import { format as formatDate, parse as parseDate } from 'date-fns';
import { ARROW } from '~/defaults/icons';
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';
import DatePicker from '~/components/Inputs/Date/DatePicker';
import IconArrowDropDown from '~/components/Icon/Arrows/IconArrowDropDown';

export default {
    name: 'ProductTemplateDate',
    mixins: [baseProductTemplateElementMixin],
    components: {
        DatePicker,
        IconArrowDropDown,
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
    computed: {
        dropDownState() {
            return this.isFocused
                ? ARROW.UP
                : ARROW.DOWN;
        },
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
