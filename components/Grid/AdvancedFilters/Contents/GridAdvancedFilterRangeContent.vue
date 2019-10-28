/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent>
        <div class="container">
            <TextField
                :value="filter[operators.GREATER_OR_EQUAL]"
                :input="{ type: 'number' }"
                placeholder="From"
                underline
                center-alignment
                small
                @input="(fromValue) => onValueChange(fromValue, operators.GREATER_OR_EQUAL)" />
            <span class="dash font--medium-12-16">-</span>
            <TextField
                :value="filter[operators.SMALLER_OR_EQUAL]"
                :input="{ type: 'number' }"
                placeholder="To"
                underline
                center-alignment
                small
                @input="(toValue) => onValueChange(toValue, operators.SMALLER_OR_EQUAL)" />
        </div>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import TextField from '~/components/Inputs/TextField';
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import { FILTER_OPERATOR } from '~/defaults/operators';

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
        onValueChange(value, operator) {
            this.$emit('input', { value, operator });
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
    }
</style>
