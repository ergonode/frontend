/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent
        :is-empty-record="filter.value.isEmptyRecord"
        @input="onEmptyRecordChange">
        <DateRangePickerContent
            :value="parsedDate"
            :input-header="true"
            @input="onValueChange" />
    </GridAdvancedFilterBaseContent>
</template>

<script>
import { format as formatDate, parse as parseDate } from 'date-fns';
import GridAdvancedFilterBaseContent from '@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import DateRangePickerContent from '@Core/components/Inputs/DatePicker/DateRangePickerContent';
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import { DEFAULT_FORMAT } from '@Core/models/calendar/calendar';

export default {
    name: 'GridAdvancedFilterDateContent',
    components: {
        GridAdvancedFilterBaseContent,
        DateRangePickerContent,
    },
    props: {
        filter: {
            type: Object,
            required: true,
        },
    },
    computed: {
        dateFormat() {
            return DEFAULT_FORMAT;
        },
        parsedDate() {
            const dateFrom = this.filter.value[FILTER_OPERATOR.GREATER_OR_EQUAL] ? parseDate(
                this.filter.value[FILTER_OPERATOR.GREATER_OR_EQUAL], this.dateFormat, new Date(),
            ) : null;
            const dateTo = this.filter.value[FILTER_OPERATOR.SMALLER_OR_EQUAL] ? parseDate(
                this.filter.value[FILTER_OPERATOR.SMALLER_OR_EQUAL], this.dateFormat, new Date(),
            ) : null;

            return {
                from: dateFrom,
                to: dateTo,
            };
        },
    },
    methods: {
        onValueChange({ from, to }) {
            const dateFrom = from ? formatDate(from, this.dateFormat) : null;
            const dateTo = to ? formatDate(to, this.dateFormat) : null;

            if (this.filter.value[FILTER_OPERATOR.GREATER_OR_EQUAL] !== dateFrom
                && dateFrom) this.$emit('input', { value: dateFrom, operator: FILTER_OPERATOR.GREATER_OR_EQUAL });
            else if (this.filter.value[FILTER_OPERATOR.SMALLER_OR_EQUAL] !== dateTo
                && dateTo) this.$emit('input', { value: dateTo, operator: FILTER_OPERATOR.SMALLER_OR_EQUAL });
        },
        onEmptyRecordChange(value) {
            this.$emit('emptyRecord', value);
        },
    },
};
</script>
