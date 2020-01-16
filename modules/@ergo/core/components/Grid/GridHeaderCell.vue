/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="true"
        :spacebar-edition="false">
        <Component
            :is="headerComponent"
            v-bind="headerComponentProps"
            @sort="onSort"
            @focus="onFocus"
            @removeColumn="onRemoveColumn" />
    </GridCell>
</template>

<script>
import { GRID_HEADER_TYPE } from '@Core/defaults/grid';
import GridPresentationHeaderCell from '@Core/components/Grid/PresentationCells/GridPresentationHeaderCell';

export default {
    name: 'GridHeaderCell',
    components: {
        GridCell: () => import('@Core/components/Grid/GridCell'),
    },
    props: {
        columnIndex: {
            type: Number,
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        column: {
            type: Object,
            required: true,
        },
        sortedColumn: {
            type: Object,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        isColumnEditable: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        headerComponent() {
            const { type } = this.column.header;

            if (type === GRID_HEADER_TYPE.PLAIN) return GridPresentationHeaderCell;

            return () => import('@Core/components/Grid/PresentationCells/GridPresentationInteractiveHeaderCell');
        },
        headerComponentProps() {
            const {
                title,
                hint,
                type,
                suffix,
            } = this.column.header;

            if (type === GRID_HEADER_TYPE.INTERACTIVE) {
                return {
                    columnIndex: this.columnIndex,
                    column: this.column,
                    sortedColumn: this.sortedColumn,
                    isColumnEditable: this.isColumnEditable,
                };
            }

            return {
                title,
                hint,
                suffix,
            };
        },
    },
    methods: {
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onSort(sortState) {
            this.$emit('sort', sortState);
        },
        onRemoveColumn(columnIndex) {
            this.$emit('removeColumnAtIndex', columnIndex);
        },
    },
};
</script>
