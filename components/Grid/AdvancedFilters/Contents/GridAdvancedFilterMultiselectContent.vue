/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent>
        <TranslationMultiselectListContent
            :options="options"
            :selected-options="filterValue"
            @value="onValueChange" />
    </GridAdvancedFilterBaseContent>
</template>

<script>
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import TranslationMultiselectListContent from '~/components/Inputs/Select/Contents/TranslationMultiselectListContent';
import { FILTER_OPERATOR } from '~/defaults/operators';

export default {
    name: 'GridAdvancedFilterMultiselectContent',
    components: {
        GridAdvancedFilterBaseContent,
        TranslationMultiselectListContent,
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
            if (this.filter
                && this.filter[FILTER_OPERATOR.EQUAL]) return this.filter[FILTER_OPERATOR.EQUAL].split(',');

            return [];
        },
    },
    methods: {
        onValueChange(values) {
            this.$emit('input', { value: values.join(','), operator: FILTER_OPERATOR.EQUAL });
        },
    },
};
</script>
