/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="collectionCellComponent"
        :data="data"
        :drafts="drafts"
        :object-fit="objectFit"
        :multiselect="multiselect"
        :locked="locked"
        :selected="selectedRowState"
        :is-select-column="isSelectColumn"
        @select="onSelectRow"
        @row-action="onRowAction"
        @cell-value="onCellValueChange" />
</template>

<script>

export default {
    name: 'GridCollectionCell',
    props: {
        /**
         * Component data used for filling cell
         */
        data: {
            type: Object,
            required: true,
        },
        /**
         * The drafts are unsaved changes, cached changed data at given time
         */
        drafts: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines image objectFit property
         */
        objectFit: {
            type: String,
            default: '',
        },
        /**
         * The model of extended data column type cell component
         */
        extendedDataCell: {
            type: Function,
            default: null,
        },
        /**
         * Determinate if the component is not being able to edit
         */
        locked: {
            type: Boolean,
            default: false,
        },
        /**
         * The map of selected rows
         */
        selectedRows: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The map of rows excluded from selection
         */
        excludedFromSelectionRows: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
            type: Boolean,
            default: true,
        },
        /**
         * Determines if every row should be selected
         */
        isSelectedAll: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if selecting row column is visible
         */
        isSelectColumn: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        collectionCellComponent() {
            if (this.extendedDataCell) {
                return this.extendedDataCell;
            }

            return () => import('@UI/components/Grid/Layout/Collection/Cells/GridCollectionDefaultCell');
        },
        selectedRowState() {
            return this.selectedRows[this.data.id]
                || (this.isSelectedAll && !this.excludedFromSelectionRows[this.data.id]);
        },
    },
    methods: {
        onSelectRow({
            row,
            selected,
        }) {
            if (this.isSelectedAll) {
                this.$emit('excluded-rows-select', {
                    isExcluded: !selected,
                    rowIds: [
                        row,
                    ],
                });
            } else {
                this.$emit('rows-select', {
                    isSelected: selected,
                    rowIds: [
                        row,
                    ],
                });
            }
        },
        onRowAction(payload) {
            this.$emit('row-action', payload);
        },
        onCellValueChange(payload) {
            this.$emit('cell-value', payload);
        },
    },
};
</script>
