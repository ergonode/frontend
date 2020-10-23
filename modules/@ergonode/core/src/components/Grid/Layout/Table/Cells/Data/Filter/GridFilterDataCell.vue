/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="filterCellComponent"
        :value="value"
        :row-index="rowIndex"
        :column-index="columnIndex"
        :column-id="columnId"
        :language-code="languageCode"
        :data="filter"
        @edit-filter-cell="onEditFilterCell"
        @filter-value="onFilterValueChange" />
</template>

<script>
export default {
    name: 'GridFilterDataCell',
    props: {
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
         * Unique column identifier
         */
        columnId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines which component will be loaded
         */
        type: {
            type: String,
            default: '',
        },
        /**
         * Filter data model
         */
        filter: {
            type: Object,
            default: null,
        },
        /**
         * Code of the language
         */
        languageCode: {
            type: String,
            default: '',
        },
        /**
         * The model of extended data column type filter cell component
         */
        extendedDataFilterCell: {
            type: Object,
            default: null,
        },
    },
    computed: {
        filterCellComponent() {
            if (!this.type || !this.filter) {
                return null;
            }

            if (this.extendedDataFilterCell) {
                return this.extendedDataFilterCell;
            }

            return () => import(`@Core/components/Grid/Layout/Table/Cells/Data/Filter/Grid${this.type}FilterDataCell`)
                .catch(() => () => import('@Core/components/Grid/Layout/Table/Cells/Data/Filter/GridDefaultFilterDataCell'));
        },
    },
    methods: {
        onEditFilterCell(payload) {
            this.$emit('edit-filter-cell', payload);
        },
        onFilterValueChange(payload) {
            this.$emit('filter-value', payload);
        },
    },
};
</script>
