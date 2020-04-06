/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridDraggableColumn
        :index="columnIndex"
        :column="column"
        :is-header-focused="isHeaderFocused"
        @swapColumns="onSwapColumns"
        @remove="onRemoveColumn"
        @updateWidth="onUpdateWidth"
        @drop="onDrop">
        <GridHeaderCell
            :column-index="columnIndex"
            :row-index="rowsOffset"
            :column="column"
            :sorted-column="sortedColumn"
            @focus="onHeaderFocus"
            @sort="onSortColumn"
            @remove="onRemoveColumn" />
        <slot
            name="filter"
            :is-locked="isFilterLocked"
            :filter="filter"
            :language-code="column.language"
            :column-index="columnIndex"
            :row-index="rowsOffset + basicFiltersOffset">
            <GridTableCell
                :locked="true"
                :row="rowsOffset + basicFiltersOffset"
                :column="columnIndex" />
        </slot>
        <template v-for="(row, rowIndex) in data">
            <slot
                name="cell"
                :data="row"
                :row-id="rowIds[rowIndex]"
                :column-id="column.id"
                :language-code="column.language"
                :column-index="columnIndex"
                :row-index="rowsOffset + rowIndex + basicFiltersOffset + 1"
                :draft-value="getDraftValue(rowIndex)"
                :is-locked="!isEditingAllowed"
                :is-copyable="isEditingAllowed"
                :on-value-change="onValueChange"
                :on-copy-values="onCopyValues" />
        </template>
    </GridDraggableColumn>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import GridDraggableColumn from '@Core/components/Grid/Layout/Table/Columns/GridDraggableColumn';
import GridHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridHeaderCell';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';

export default {
    name: 'GridColumn',
    components: {
        GridDraggableColumn,
        GridHeaderCell,
        GridTableCell,
    },
    props: {
        column: {
            type: Object,
            required: true,
        },
        filter: {
            type: Object,
            default: null,
        },
        sortedColumn: {
            type: Object,
            default: () => ({}),
        },
        data: {
            type: Array,
            default: () => [],
        },
        rowIds: {
            type: Array,
            default: () => [],
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        rowsOffset: {
            type: Number,
            default: 0,
        },
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
        isEditable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isHeaderFocused: false,
        };
    },
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
        isEditingAllowed() {
            return this.column.editable && this.isEditable;
        },
        isFilterLocked() {
            return typeof this.column.filter === 'undefined';
        },
    },
    methods: {
        ...mapActions('grid', [
            'setDraftValue',
        ]),
        getDraftValue(index) {
            if (this.drafts[this.rowIds[index]]
                && this.drafts[this.rowIds[index]][this.column.id]) {
                return this.drafts[this.rowIds[index]][this.column.id];
            }

            return null;
        },
        onHeaderFocus(isFocused) {
            this.isHeaderFocused = isFocused;
        },
        onSortColumn(sortedColumn) {
            this.$emit('sort', sortedColumn);
        },
        onRemoveColumn(index) {
            this.$emit('remove', index);
        },
        onSwapColumns(payload) {
            this.$emit('swapColumns', payload);
        },
        onUpdateWidth(payload) {
            this.$emit('updateWidth', payload);
        },
        onDrop(payload) {
            this.$emit('drop', payload);
        },
        onValueChange({ rowId, columnId, value }) {
            this.setDraftValue({
                rowId,
                columnId,
                value,
            });
        },
        onCopyValues({
            from, to, rowId, columnId, value,
        }) {
            const rowIndex = this.$attrs.rowIds.findIndex(id => id === rowId);
            const offset = from.row - rowIndex;

            if (from.row < to.row) {
                for (let i = from.row - offset + 1; i < to.row - offset + 1; i += 1) {
                    this.setDraftValue({
                        rowId: this.$attrs.rowIds[i],
                        columnId,
                        value,
                    });
                }
            } else {
                for (let i = to.row - offset; i < from.row - offset; i += 1) {
                    this.setDraftValue({
                        rowId: this.$attrs.rowIds[i],
                        columnId,
                        value,
                    });
                }
            }
        },
    },
};
</script>
