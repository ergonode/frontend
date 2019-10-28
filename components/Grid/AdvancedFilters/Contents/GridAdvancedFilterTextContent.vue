/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent>
        <div class="container">
            <TextField
                :value="filterValue"
                left-alignment
                small
                underline
                @input="onValueChange" />
        </div>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import TextField from '~/components/Inputs/TextField';
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import { FILTER_OPERATOR } from '~/defaults/operators';

export default {
    name: 'GridAdvancedFilterTextContent',
    components: {
        TextField,
        GridAdvancedFilterBaseContent,
    },
    props: {
        filter: {
            type: Object,
            default: null,
        },
    },
    computed: {
        filterValue() {
            if (this.filter) return this.filter[FILTER_OPERATOR.EQUAL];

            return '';
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', { value, operator: FILTER_OPERATOR.EQUAL });
        },
    },
};
</script>

<style lang="scss" scoped>
    .container {
        padding: 8px 12px;
    }
</style>
