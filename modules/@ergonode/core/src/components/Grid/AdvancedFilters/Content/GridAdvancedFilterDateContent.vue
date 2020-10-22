/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterContent
        :value="value.isEmptyRecord"
        @input="onEmptyRecordChange">
        <DateRangePickerContent
            :value="parsedDate"
            :format="format"
            @input="onValueChange" />
    </GridAdvancedFilterContent>
</template>

<script>
import DateRangePickerContent from '@Core/components/DatePicker/DateRangePickerContent';
import GridAdvancedFilterContent from '@Core/components/Grid/AdvancedFilters/Content/GridAdvancedFilterContent';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    DEFAULT_FORMAT,
} from '@Core/models/calendar/calendar';

export default {
    name: 'GridAdvancedFilterDateContent',
    components: {
        GridAdvancedFilterContent,
        DateRangePickerContent,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
            }),
        },
        /**
         * Date format used for parsing value
         */
        format: {
            type: String,
            default: DEFAULT_FORMAT,
        },
    },
    computed: {
        dateFormat() {
            return DEFAULT_FORMAT;
        },
        parsedDate() {
            const valueFrom = this.value[FILTER_OPERATOR.GREATER_OR_EQUAL];
            const valueTo = this.value[FILTER_OPERATOR.SMALLER_OR_EQUAL];

            return {
                from: valueFrom,
                to: valueTo,
            };
        },
    },
    methods: {
        onValueChange(payload) {
            this.$emit('input', payload);
        },
        onEmptyRecordChange(value) {
            this.$emit('input', {
                key: 'isEmptyRecord',
                value,
            });
        },
    },
};
</script>
