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
import moment from 'moment';
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
        else this.localValue = moment(this.value, this.parameters.format).toDate();
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

            return moment(date).format(format);
        },
    },
};
</script>
