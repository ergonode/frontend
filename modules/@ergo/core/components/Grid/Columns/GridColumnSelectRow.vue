/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="pinnedColumnClass">
        <slot
            name="headerCheckCell"
            :column="0"
            :row="rowsOffset">
            <GridCell
                editing-allowed
                spacebar-edition
                :row="rowsOffset"
                :column="0"
                @edit="onRowsSelect">
                <GridPresentationCheckCell
                    :value="rowsSelectionState"
                    @input="onRowsSelect" />
            </GridCell>
        </slot>
        <GridCell
            v-if="isBasicFilters"
            :locked="true"
            :row="rowsOffset + basicFiltersOffset"
            :column="0">
            <GridCheckPlaceholderCell />
        </GridCell>
        <template v-for="(id, rowIndex) in rowIds">
            <slot
                name="checkCell"
                :column="0"
                :row="rowsOffset + rowIndex + basicFiltersOffset + 1">
                <GridEditSelectRowCell
                    :key="id"
                    :column="0"
                    :row="rowsOffset + rowIndex + basicFiltersOffset + 1"
                    :is-selected="isSelectedAllRows
                        || selectedRows[rowsOffset + rowIndex + basicFiltersOffset + 1]"
                    @select="onSelectRow" />
            </slot>
        </template>
    </div>
</template>

<script>
export default {
    name: 'GridColumnSelectRow',
    components: {
        GridCell: () => import('@Core/components/Grid/GridCell'),
        GridPresentationCheckCell: () => import('@Core/components/Grid/PresentationCells/GridPresentationCheckCell'),
        GridEditSelectRowCell: () => import('@Core/components/Grid/EditCells/GridEditSelectRowCell'),
        GridCheckPlaceholderCell: () => import('@Core/components/Grid/GridCheckPlaceholderCell'),
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
        isPinned: {
            type: Boolean,
            required: true,
        },
        selectedRows: {
            type: Object,
            required: true,
        },
        isBasicFilters: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        pinnedColumnClass() {
            return [
                'pinned-column',
                {
                    'pinned-column--left': this.isPinned,
                },
            ];
        },
        rowsSelectionState() {
            const rowsAreSelected = Boolean(Object.keys(this.selectedRows).length);

            if (!rowsAreSelected) {
                return +this.isSelectedAllRows;
            }

            return 2;
        },
        basicFiltersOffset() {
            return this.isBasicFilters ? 1 : 0;
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
    .pinned-column {
        position: sticky;
        left: 0;
        z-index: $Z_INDEX_LVL_3;
        display: grid;
        box-sizing: border-box;

        &--left {
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
