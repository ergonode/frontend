/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        v-if="filter"
        :is="filterCellComponent"
        :value="value"
        :row-index="rowIndex"
        :column-index="columnIndex"
        :column-id="columnId"
        :language-code="languageCode"
        :data="filter"
        @editFilterCell="onEditFilterCell"
        @filterValue="onFilterValueChange" />
    <GridTableCell
        v-else
        :locked="true"
        :row="rowIndex"
        :column="columnIndex" />
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';

export default {
    name: 'GridFilterDataCell',
    components: {
        GridTableCell,
    },
    props: {
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        columnId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        value: {
            type: Object,
            default: () => ({}),
        },
        filter: {
            type: Object,
            default: null,
        },
        languageCode: {
            type: String,
            default: '',
        },
    },
    computed: {
        filterCellComponent() {
            return () => import(`@Core/components/Grid/Layout/Table/Cells/Data/Filter/Grid${capitalizeAndConcatenationArray(this.filter.type.split('_'))}FilterDataCell`)
                .catch(() => () => import('@Core/components/Grid/Layout/Table/Cells/Data/Filter/GridDefaultFilterDataCell'));
        },
    },
    methods: {
        onEditFilterCell(payload) {
            this.$emit('editFilterCell', payload);
        },
        onFilterValueChange(payload) {
            this.$emit('filterValue', payload);
        },
    },
};
</script>
