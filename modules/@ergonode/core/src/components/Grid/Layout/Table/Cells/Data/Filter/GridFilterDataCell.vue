/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        v-if="filterCellComponent"
        :is="filterCellComponent"
        :value="value"
        :row-index="rowIndex"
        :column-index="columnIndex"
        :column-id="columnId"
        :language-code="languageCode"
        :data="filter"
        @edit-filter-cell="onEditFilterCell"
        @filter-value="onFilterValueChange" />
    <GridTableCell
        v-else
        :locked="true"
        :row="rowIndex"
        :column="columnIndex" />
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';

export default {
    name: 'GridFilterDataCell',
    components: {
        GridTableCell,
    },
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
    },
    computed: {
        filterCellComponent() {
            if (!this.type || !this.filter) {
                return null;
            }

            const extendedComponents = this.$getExtendedComponents('@Core/components/Grid/Layout/Table/Cells/Data/Filter');

            if (extendedComponents && extendedComponents[this.filter.type]) {
                return extendedComponents[this.filter.type];
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
