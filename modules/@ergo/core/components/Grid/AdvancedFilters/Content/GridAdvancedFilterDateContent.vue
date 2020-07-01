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
import GridAdvancedFilterContent from '@Core/components/Grid/AdvancedFilters/Content/GridAdvancedFilterContent';
import DateRangePickerContent from '@Core/components/Inputs/DatePicker/DateRangePickerContent';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    DEFAULT_FORMAT,
} from '@Core/models/calendar/calendar';
import {
    format as formatDate,
    parse as parseDate,
} from 'date-fns';

export default {
    name: 'GridAdvancedFilterDateContent',
    components: {
        GridAdvancedFilterContent,
        DateRangePickerContent,
    },
    props: {
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
            }),
        },
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
                from: valueFrom
                    ? parseDate(valueFrom, this.dateFormat, new Date())
                    : null,
                to: valueTo
                    ? parseDate(valueTo, this.dateFormat, new Date())
                    : null,
            };
        },
    },
    methods: {
        onValueChange({
            from, to,
        }) {
            const dateFrom = from ? formatDate(from, this.dateFormat) : null;
            const dateTo = to ? formatDate(to, this.dateFormat) : null;

            if (this.value[FILTER_OPERATOR.GREATER_OR_EQUAL] !== dateFrom
                && dateFrom) {
                this.$emit('input', {
                    key: FILTER_OPERATOR.GREATER_OR_EQUAL,
                    value: dateFrom,
                });
            } else if (this.value[FILTER_OPERATOR.SMALLER_OR_EQUAL] !== dateTo
                && dateTo) {
                this.$emit('input', {
                    key: FILTER_OPERATOR.SMALLER_OR_EQUAL,
                    value: dateTo,
                });
            }
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
