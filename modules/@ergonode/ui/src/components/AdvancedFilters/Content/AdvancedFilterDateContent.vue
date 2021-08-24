/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilterContent>
        <AdvancedFilterShowOnly
            :value="value.isEmptyRecord"
            @input="onEmptyRecordChange" />
        <Divider />
        <DateRangePickerContent
            v-if="!value.isEmptyRecord"
            :value="parsedDate"
            :format="format"
            @input="onValueChange" />
    </AdvancedFilterContent>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import AdvancedFilterShowOnly from '@UI/components/AdvancedFilters/AdvancedFilterShowOnly';
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
        AdvancedFilterShowOnly,
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
        onValueChange({
            from,
            to,
        }) {
            if (from !== this.parsedDate.from) {
                this.$emit('input', {
                    key: FILTER_OPERATOR.GREATER_OR_EQUAL,
                    value: from,
                });
            }

            if (to !== this.parsedDate.to) {
                this.$emit('input', {
                    key: FILTER_OPERATOR.SMALLER_OR_EQUAL,
                    value: to,
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
