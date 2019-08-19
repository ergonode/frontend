/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DatePicker
        :value="localValue"
        solid
        :label="label"
        :placeholder="parameters.format"
        :format="parameters.format"
        :error-messages="errorMessages"
        multiselect
        :required="required"
        :disabled="disabled"
        @focus="onFocusChange"
        @input="onValueChange">
        <template v-slot:append>
            <ProductTemplateDetailsContent
                :hint="hint"
                :error-messages="errorMessages"
                :is-error="isError">
                <template v-slot:append>
                    <IconArrowDropDown :state="dropDownState" />
                </template>
            </ProductTemplateDetailsContent>
        </template>
    </DatePicker>
</template>

<script>
import { format as formatDate, parse as parseDate } from 'date-fns';
import { Arrow } from '~/model/icons/Arrow';
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
        else this.localValue = parseDate(this.value, this.parameters.format);

        console.log(parseDate(this.value, this.parameters.format), parseDate(this.value, 'YYYY-MM-DD'));
    },
    computed: {
        dropDownState() {
            return this.isFocused
                ? Arrow.UP
                : Arrow.DOWN;
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
