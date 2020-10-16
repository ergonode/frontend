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
        :is-draft="isDraft"
        :row-id="rowId"
        :error-messages="errorMessages"
        :column-index="columnIndex"
        :row-index="rowIndex"
        :is-locked="isLocked"
        :is-copyable="isCopyable"
        :is-selected="isSelected"
        @edit-cell="onEditCell"
        @cell-value="onCellValueChange"
    />
</template>

<script>
export default {
    name: 'GridDataCell',
    props: {
        /**
         * Component data used for filling table cell
         */
        data: {
            type: Object,
            required: true,
        },
        /**
         * Data of the column
         */
        column: {
            type: Object,
            required: true,
        },
        /**
         * The error messages are messages which comes from validation process
         */
        errorMessages: {
            type: String,
            default: '',
        },
        /**
         * Determines which component will be loaded
         */
        type: {
            type: String,
            default: '',
        },
        /**
         * The drafts are unsaved changes, cached changed data at given time
         */
        drafts: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Unique row identifier
         */
        rowId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        /**
         * Row index of given component at the loop
         */
        rowIndex: {
            type: Number,
            required: true,
        },
        /**
         * Column index of given component at the loop
         */
        columnIndex: {
            type: Number,
            required: true,
        },
        /**
         * Determinate if the component is not being able to edit
         */
        isLocked: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is being able to copy value by mass action
         */
        isCopyable: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if component is selected
         */
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        dataCellComponent() {
            const extendedComponents = this.$getExtendedComponents('@Core/components/Grid/Layout/Table/Cells/Data');

            if (extendedComponents && extendedComponents[this.column.type]) {
                return extendedComponents[this.column.type];
            }

            return () => import(`@Core/components/Grid/Layout/Table/Cells/Data/Grid${this.type}DataCell`)
                .catch(() => import('@Core/components/Grid/Layout/Table/Cells/Data/GridTextDataCell'));
        },
        draft() {
            return this.drafts[`${this.rowId}/${this.column.id}`];
        },
        isDraft() {
            return typeof this.drafts[`${this.rowId}/${this.column.id}`] !== 'undefined';
        },
    },
    methods: {
        onEditCell(payload) {
            this.$emit('edit-cell', payload);
        },
        onCellValueChange(payload) {
            this.$emit('cell-value', payload);
        },
    },
};
</script>
