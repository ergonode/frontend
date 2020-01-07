/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="pinnedColumnClass">
        <slot
            name="headerCheckCell"
            :column="0"
            :row="getRowIndex(0)">
            <GridCell
                editing-allowed
                spacebar-edition
                :row="getRowIndex(0)"
                :column="0"
                @edit="onRowsSelect">
                <GridPresentationCheckCell
                    :value="rowsSelectionState"
                    @input="onRowsSelect" />
            </GridCell>
        </slot>
        <GridCell
            v-if="basicFilters"
            :locked="true"
            :spacebar-edition="false"
            :row="getRowIndex(1)"
            :column="0">
            <GridCheckPlaceholderCell />
        </GridCell>
        <template v-for="(id, rowIndex) in rowIds">
            <slot
                name="checkCell"
                :column="0"
                :row="getRowIndex(rowIndex + rowsOffset)">
                <GridEditSelectRowCell
                    :key="id"
                    :column="0"
                    :row="getRowIndex(rowIndex + rowsOffset)"
                    :is-selected="isSelectedAllRows
                        || selectedRows[getRowIndex(rowIndex + rowsOffset)]"
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
        basicFilters: {
            type: Boolean,
            default: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        numberOfDisplayedElements: {
            type: Number,
            required: true,
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
    },
    methods: {
        getRowIndex(index) {
            return index
                + ((this.currentPage - 1) * this.numberOfDisplayedElements);
        },
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
        z-index: $Z_INDEX_LVL_2;
        display: grid;
        box-sizing: border-box;

        &--left {
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
