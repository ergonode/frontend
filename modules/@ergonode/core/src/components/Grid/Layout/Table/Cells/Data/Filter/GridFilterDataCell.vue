/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="filterCellComponent"
        :row-index="rowIndex"
        :column-index="columnIndex"
        :language-code="languageCode"
        :data="filter"
        @editCell="onEditCell"
        @filter="onFilter" />
</template>

<script>
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';

export default {
    name: 'GridFilterDataCell',
    props: {
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        filter: {
            type: Object,
            required: true,
        },
        languageCode: {
            type: String,
            default: '',
        },
    },
    computed: {
        filterCellComponent() {
            return () => import(`@Core/components/Grid/Layout/Table/Cells/Data/Filter/Grid${capitalizeAndConcatenationArray(this.filter.type.split('_'))}FilterDataCell`)
                .catch(() => () => import('@Core/components/Grid/Layout/Table/Cells/Data/Filter/GridDefaultFilterCell'));
        },
    },
    methods: {
        onEditCell(payload) {
            this.$emit('editCell', payload);
        },
        onFilter(payload) {
            this.$emit('filter', payload);
        },
    },
};
</script>
