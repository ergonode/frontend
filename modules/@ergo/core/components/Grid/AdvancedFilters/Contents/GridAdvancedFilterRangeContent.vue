/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent
        :is-empty-record="filter.value.isEmptyRecord"
        @input="onEmptyRecordChange">
        <div class="container">
            <TextField
                :value="filter.value[operators.GREATER_OR_EQUAL]"
                :input="{ type: 'number', max: filter.value[operators.SMALLER_OR_EQUAL] }"
                placeholder="From"
                underline
                center-alignment
                small
                @input="onFromValueChange" />
            <span class="dash">-</span>
            <TextField
                :value="filter.value[operators.SMALLER_OR_EQUAL]"
                :input="{ type: 'number', min: filter.value[operators.GREATER_OR_EQUAL] }"
                placeholder="To"
                underline
                center-alignment
                small
                @input="onToValueChange" />
        </div>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import GridAdvancedFilterBaseContent from '@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import TextField from '@Core/components/Inputs/TextField';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';

export default {
    name: 'GridAdvancedFilterRangeContent',
    components: {
        TextField,
        GridAdvancedFilterBaseContent,
    },
    props: {
        filter: {
            type: Object,
            required: true,
        },
    },
    computed: {
        operators() {
            return FILTER_OPERATOR;
        },
    },
    methods: {
        onFromValueChange(value) {
            const filterValue = this.filter.value[FILTER_OPERATOR.GREATER_OR_EQUAL];

            if (+value <= +this.filter.value[FILTER_OPERATOR.SMALLER_OR_EQUAL]
                || typeof filterValue === 'undefined'
                || filterValue === '') {
                this.$emit('input', {
                    value,
                    key: FILTER_OPERATOR.GREATER_OR_EQUAL,
                });
            }
        },
        onToValueChange(value) {
            const filterValue = this.filter.value[FILTER_OPERATOR.SMALLER_OR_EQUAL];

            if (+value >= +this.filter.value[FILTER_OPERATOR.GREATER_OR_EQUAL]
                || typeof filterValue === 'undefined'
                || filterValue === '') {
                this.$emit('input', {
                    value,
                    key: FILTER_OPERATOR.SMALLER_OR_EQUAL,
                });
            }
        },
        onEmptyRecordChange(value) {
            this.$emit('emptyRecord', value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .container {
        display: grid;
        grid-template-columns: 80px 24px 80px;
        align-items: center;
        padding: 8px 12px;
    }

    .dash {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
    }
</style>
