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
                :input="{ type: 'number' }"
                placeholder="From"
                :type="underlineInputType"
                :alignment="centerAlignment"
                :size="smallSize"
                @input="(fromValue) => onValueChange(fromValue, operators.GREATER_OR_EQUAL)" />
            <span class="dash">-</span>
            <TextField
                :value="filter.value[operators.SMALLER_OR_EQUAL]"
                :input="{ type: 'number' }"
                placeholder="To"
                :type="underlineInputType"
                :alignment="centerAlignment"
                :size="smallSize"
                @input="(toValue) => onValueChange(toValue, operators.SMALLER_OR_EQUAL)" />
        </div>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import GridAdvancedFilterBaseContent from '@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import TextField from '@Core/components/Inputs/TextField';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';

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
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        centerAlignment() {
            return ALIGNMENT.CENTER;
        },
    },
    methods: {
        onValueChange(value, operator) {
            this.$emit('input', {
                value,
                key: operator,
            });
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
