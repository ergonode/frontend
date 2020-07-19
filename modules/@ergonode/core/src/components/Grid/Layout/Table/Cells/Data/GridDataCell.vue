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
        :error-messages="errorMessages"
        :column-index="columnIndex"
        :row-index="rowIndex"
        :is-locked="isLocked"
        :is-copyable="isCopyable"
        :is-selected="isSelected"
        @editCell="onEditCell"
        @cellValue="onCellValueChange"
        @columnValues="onColumnValuesChange"
    />
</template>

<script>
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
        errorMessages: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
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

            return () => import(`@Core/components/Grid/Layout/Table/Cells/Data/Grid${this.type}DataCell`)
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
        onColumnValuesChange(payload) {
            this.$emit('columnValues', payload);
        },
    },
};
</script>
