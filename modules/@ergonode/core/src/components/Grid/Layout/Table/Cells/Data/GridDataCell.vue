/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="dataCellComponent"
        :data="data"
        :column="column"
        :draft="draft"
        :row-id="rowId"
        :column-index="columnIndex"
        :row-index="rowIndex"
        :is-locked="isLocked"
        :is-copyable="isCopyable"
        :is-selected="isSelected"
        @editCell="onEditCell"
        @cellValue="onCellValueChange"
        @cellValues="onCellValuesChange"
    />
</template>

<script>
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';

export default {
    name: 'GridDataCell',
    props: {
        data: {
            type: Object,
            required: true,
        },
        column: {
            type: Object,
            required: true,
        },
        draft: {
            default: null,
        },
        rowId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        isLocked: {
            type: Boolean,
            required: false,
        },
        isCopyable: {
            type: Boolean,
            required: false,
        },
        isSelected: {
            type: Boolean,
            required: false,
        },
    },
    computed: {
        dataCellComponent() {
            const extendedComponents = this.$getExtendedComponents('@Core/Components/Grid/Layout/Table/Cells/Data');

            if (extendedComponents && extendedComponents[this.column.type]) {
                return extendedComponents[this.column.type];
            }

            return () => import(`@Core/components/Grid/Layout/Table/Cells/Data/Grid${capitalizeAndConcatenationArray(this.column.type.split('_'))}DataCell`)
                .catch(() => import('@Core/components/Grid/Layout/Table/Cells/Data/GridTextDataCell'));
        },
    },
    methods: {
        onEditCell(payload) {
            this.$emit('editCell', payload);
        },
        onCellValueChange(payload) {
            this.$emit('cellValue', payload);
        },
        onCellValuesChange(payload) {
            this.$emit('cellValues', payload);
        },
    },
};
</script>
