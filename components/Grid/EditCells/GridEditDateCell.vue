/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <Select
        :value="value"
        solid
        :placeholder="parameters.format"
        :error-messages="errorMessages"
        :dismissible="false"
        autofocus
        @focus="onFocus">
        <DatePickerContent
            slot="select"
            slot-scope="{ dismissSelect }"
            :style="selectBoundingBox"
            :selected-date="parsedDate"
            @apply="e => onApply(e, dismissSelect)"
            @clear="onClear" />
    </Select>
</template>

<script>
import moment from 'moment';
import Select from '~/components/Inputs/Select/Select';
import DatePickerContent from '~/components/Inputs/Select/Contents/DatePickerContent';

export default {
    name: 'GridEditDateCell',
    components: {
        Select,
        DatePickerContent,
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
            selectBoundingBox: {},
            isFocused: false,
        };
    },
    computed: {
        appendStateIcon() {
            return this.isFocused
                ? 'arrow-triangle trans-half'
                : 'arrow-triangle';
        },
        parsedDate() {
            return moment(this.value, this.parameters.format).toDate();
        },
    },
    methods: {
        onFocus(isFocused) {
            if (isFocused) {
                this.selectBoundingBox = this.getSelectBoundingBox();
            }

            this.$emit('focus', isFocused);
        },
        onApply(date, dismissSelect) {
            dismissSelect();

            this.$emit('input', this.formatDate(date));
            this.$emit('focus', false);
        },
        onClear() {
            this.$emit('input', '');
        },
        formatDate(date) {
            if (!date) return null;
            const { format } = this.parameters;

            return moment(date).format(format);
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
