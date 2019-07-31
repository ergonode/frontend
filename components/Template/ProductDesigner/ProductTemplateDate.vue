/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="localValue"
        solid
        :label="label"
        :placeholder="parameters.format"
        :error-messages="errorMessages"
        :dismissible="false"
        :required="required"
        @focus="onSelectFocus">
        <ProductTemplateDetailsContent
            slot="appendIcon"
            :hint="hint"
            :error-messages="errorMessages"
            :is-error="isError">
            <template v-slot:append>
                <IconArrowDropDown :state="dropDownState" />
            </template>
        </ProductTemplateDetailsContent>
        <DatePickerContent
            slot="select"
            slot-scope="{ dismissSelect }"
            :style="selectBoundingBox"
            :selected-date="parsedDate"
            @apply="e => onApplyDate(e, dismissSelect)"
            @clear="onClearDate" />
    </Select>
</template>

<script>
import moment from 'moment';
import { Arrow } from '~/model/icons/Arrow';
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';
import Select from '~/components/Inputs/Select/Select';
import DatePickerContent from '~/components/Inputs/Select/Contents/DatePickerContent';
import IconArrowDropDown from '~/components/Icon/Arrows/IconArrowDropDown';

export default {
    name: 'ProductTemplateDate',
    mixins: [baseProductTemplateElementMixin],
    components: {
        Select,
        DatePickerContent,
        IconArrowDropDown,
    },
    data() {
        return {
            selectBoundingBox: {},
            isFocused: false,
        };
    },
    computed: {
        dropDownState() {
            return this.isFocused
                ? Arrow.UP
                : Arrow.DOWN;
        },
        parsedDate() {
            return moment(this.value, this.parameters.format).toDate();
        },
    },
    methods: {
        onFocusChange(isFocused) {
            this.isFocused = isFocused;
        },
        onApplyDate(date, dismissSelect) {
            dismissSelect();

            this.localValue = this.formatDate(date);

            this.debounceFunc(this.localValue);
        },
        onClearDate() {
            this.debounceFunc('');
        },
        formatDate(date) {
            if (!date) return null;
            const { format } = this.parameters;

            return moment(date).format(format);
        },
        onSelectFocus(isFocused) {
            if (isFocused) {
                this.selectBoundingBox = this.getSelectBoundingBox();
            }
        },
        getSelectBoundingBox() {
            const { $el } = this;
            const boundingRect = $el.getBoundingClientRect();
            const {
                top,
                left,
                height,
            } = boundingRect;
            const { innerHeight } = window;
            const maxHeight = 300;

            if (innerHeight - top < maxHeight) {
                const offsetBottom = innerHeight - top;

                return {
                    left: `${left}px`,
                    bottom: `${offsetBottom + 1}px`,
                };
            }

            return {
                left: `${left}px`,
                top: `${top + height + 2}px`,
            };
        },
    },
};
</script>
