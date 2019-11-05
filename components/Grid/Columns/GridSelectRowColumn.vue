/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridBaseColumn
        :sticky="true"
        :style="colGridTemplate">
        <GridCell
            editing-allowed
            action-cell
            :row="0"
            :column="0"
            @edit="onRowsSelect">
            <GridCheckCell
                :value="allRowsSelectionState"
                @input="onRowsSelect" />
        </GridCell>
        <GridCell
            v-if="basicFilters"
            :locked="true"
            :editing-allowed="false"
            :action-cell="false"
            :row="1"
            :column="0">
            <GridCheckPlaceholderCell />
        </GridCell>
        <GridEditSelectRowCell
            v-for="row in rowsNumber"
            :key="row + rowsOffset - 1"
            :column="0"
            :row="(row + rowsOffset - 1) * currentPage"
            :is-selected="isSelectedAllRows
                || selectedRows[(row + rowsOffset - 1) * currentPage]"
            @select="onRowSelect" />
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
        rowsNumber: {
            type: Number,
            default: 0,
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
        rowHeight: {
            type: Number,
            default: 40,
        },
    },
    computed: {
        allRowsSelectionState() {
            const rowsAreSelected = Boolean(Object.keys(this.selectedRows).length);

            if (!rowsAreSelected) {
                return +this.isSelectedAllRows;
            }

            return 2;
        },
        colGridTemplate() {
            return {
                gridAutoRows: `${this.rowHeight}px`,
            };
        },
    },
    methods: {
        onRowsSelect() {
            this.$emit('rowsSelect', !this.isSelectedAllRows);
        },
        onRowSelect(payload) {
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
