/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilterContent
        :value="value.isEmptyRecord"
        @input="onEmptyRecordChange">
        <DateRangePickerContent
            :value="parsedDate"
            :format="format"
            @input="onValueChange" />
    </AdvancedFilterContent>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import AdvancedFilterContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterContent';
import DateRangePickerContent from '@UI/components/DatePicker/DateRangePickerContent';
import {
    DEFAULT_FORMAT,
} from '@UI/models/calendar';

export default {
    name: 'AdvancedFilterDateContent',
    components: {
        AdvancedFilterContent,
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
