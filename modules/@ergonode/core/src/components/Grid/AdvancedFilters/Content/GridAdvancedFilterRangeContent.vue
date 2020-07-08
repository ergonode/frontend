/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterContent
        :value="value.isEmptyRecord"
        @input="onEmptyRecordChange">
        <div class="container">
            <TextField
                :value="value[operators.GREATER_OR_EQUAL]"
                :input="{ type: 'number', max: value[operators.SMALLER_OR_EQUAL] }"
                placeholder="From"
                :type="underlineInputType"
                :alignment="centerAlignment"
                :size="smallSize"
                @input="onFromValueChange" />
            <span class="dash">-</span>
            <TextField
                :value="value[operators.SMALLER_OR_EQUAL]"
                :input="{ type: 'number', min: value[operators.GREATER_OR_EQUAL] }"
                placeholder="To"
                :type="underlineInputType"
                :alignment="centerAlignment"
                :size="smallSize"
                @input="onToValueChange" />
        </div>
    </GridAdvancedFilterContent>
</template>

<script>
import GridAdvancedFilterContent from '@Core/components/Grid/AdvancedFilters/Content/GridAdvancedFilterContent';
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
        GridAdvancedFilterContent,
    },
    props: {
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
            }),
        },
    },
    computed: {
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        centerAlignment() {
            return ALIGNMENT.CENTER;
        },
        operators() {
            return FILTER_OPERATOR;
        },
    },
    methods: {
        onFromValueChange(value) {
            const toValue = this.value[FILTER_OPERATOR.SMALLER_OR_EQUAL];

            if (+value <= +toValue
                || value === ''
                || toValue === null
                || toValue === ''
                || typeof toValue === 'undefined') {
                this.$emit('input', {
                    key: FILTER_OPERATOR.GREATER_OR_EQUAL,
                    value,
                });
            }
        },
        onToValueChange(value) {
            const fromValue = this.value[FILTER_OPERATOR.GREATER_OR_EQUAL];

            if (+value >= +fromValue
                || value === '') {
                this.$emit('input', {
                    key: FILTER_OPERATOR.SMALLER_OR_EQUAL,
                    value,
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
