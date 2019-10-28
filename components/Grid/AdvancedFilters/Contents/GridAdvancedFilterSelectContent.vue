/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent
        :is-empty-record="isEmptyRecord"
        @input="onEmptyRecordChange">
        <TranslationSelectListContent
            :options="options"
            :selected-options="filterValue"
            @value="onValueChange" />
    </GridAdvancedFilterBaseContent>
</template>

<script>
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import TranslationSelectListContent from '~/components/Inputs/Select/Contents/TranslationSelectListContent';
import { FILTER_OPERATOR } from '~/defaults/operators/main';

export default {
    name: 'GridAdvancedFilterSelectContent',
    components: {
        GridAdvancedFilterBaseContent,
        TranslationSelectListContent,
    },
    props: {
        filter: {
            type: Object,
            required: true,
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        filterValue() {
            if (this.filter) return this.filter[FILTER_OPERATOR.EQUAL];

            return '';
        },
        isEmptyRecord() {
            if (this.filter) return Boolean(this.filter.isEmptyRecord);

            return false;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', { value: value.key, operator: FILTER_OPERATOR.EQUAL });
        },
        onEmptyRecordChange(value) {
            this.$emit('emptyRecord', value);
        },
    },
};
</script>
