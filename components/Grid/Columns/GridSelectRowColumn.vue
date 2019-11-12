/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridBaseColumn :sticky="true">
        <slot
            name="headerCheckCell"
            :column="0"
            :row="0">
            <GridCell
                editing-allowed
                action-cell
                :row="0"
                :column="0"
                :editing="isSelectedAllRows"
                @edit="onRowsSelect">
                <GridCheckCell
                    :value="rowsSelectionState"
                    @input="onRowsSelect" />
            </GridCell>
        </slot>
        <GridCell
            v-if="basicFilters"
            :locked="true"
            :editing-allowed="false"
            :action-cell="false"
            :row="1"
            :column="0">
            <GridCheckPlaceholderCell />
        </GridCell>
        <template v-for="(id, rowIndex) in rowIds">
            <slot
                name="checkCell"
                :column="0"
                :row="(rowIndex + rowsOffset) * currentPage">
                <GridEditSelectRowCell
                    :key="id"
                    :column="0"
                    :row="(rowIndex + rowsOffset) * currentPage"
                    :is-selected="isSelectedAllRows
                        || selectedRows[(rowIndex + rowsOffset) * currentPage]"
                    @select="onSelectRow" />
            </slot>
        </template>
    </GridBaseColumn>
</template>

<script>
export default {
    name: 'GridSelectRowColumn',
    components: {
        GridBaseColumn: () => import('~/components/Grid/Columns/GridBaseColumn'),
        GridCell: () => import('~/components/Grid/GridCell'),
        GridCheckCell: () => import('~/components/Grid/GridCheckCell'),
        GridEditSelectRowCell: () => import('~/components/Grid/EditCells/GridEditSelectRowCell'),
        GridCheckPlaceholderCell: () => import('~/components/Grid/GridCheckPlaceholderCell'),
    },
    props: {
        rowIds: {
            type: Array,
            default: () => [],
        },
        rowsOffset: {
            type: Number,
            default: 0,
        },
        isSelectedAllRows: {
            type: Boolean,
            required: true,
        },
        selectedRows: {
            type: Object,
            required: true,
        },
        basicFilters: {
            type: Boolean,
            default: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    computed: {
        rowsSelectionState() {
            const rowsAreSelected = Boolean(Object.keys(this.selectedRows).length);

            if (!rowsAreSelected) {
                return +this.isSelectedAllRows;
            }

            return 2;
        },
    },
    methods: {
        onRowsSelect() {
            this.$emit('rowsSelect', !this.isSelectedAllRows);
        },
        onSelectRow(payload) {
            this.$emit('rowSelect', payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    .column {
        left: 0;

        .grid-cell:nth-child(1) {
            position: sticky !important;
            top: 0;
            z-index: 1;
            background-color: $WHITESMOKE;
        }
    }
</style>
