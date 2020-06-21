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
                :value="filterValue"
                :size="smallSize"
                :type="underlineInputType"
                @input="onValueChange" />
        </div>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import GridAdvancedFilterBaseContent from '@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import TextField from '@Core/components/Inputs/TextField';
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import { INPUT_TYPE, SIZE } from '@Core/defaults/theme';

export default {
    name: 'GridAdvancedFilterTextContent',
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
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        filterValue() {
            return this.filter.value[FILTER_OPERATOR.EQUAL] || '';
        },
    },
    methods: {
        onValueChange(value) {
            if (value !== this.filterValue) {
                this.$emit('input', { value, key: FILTER_OPERATOR.EQUAL });
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
        padding: 8px 12px;
    }
</style>
