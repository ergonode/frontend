/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="pinnedColumnClass">
        <GridCell
            :column="columnIndex"
            :row="rowsOffset"
            :spacebar-edition="false"
            :locked="true">
            <GridPresentationEditHeaderCell />
        </GridCell>
        <GridCell
            v-if="isBasicFilters"
            :column="columnIndex"
            :row="rowsOffset + basicFiltersOffset"
            :spacebar-edition="false"
            :locked="true" />
        <GridCell
            v-for="(rowLink, index) in rowLinks"
            :key="rowLink.id"
            :column="columnIndex"
            :spacebar-edition="true"
            :row="rowsOffset + index + basicFiltersOffset + 1"
            :is-selected="isSelectedAllRows
                || selectedRows[rowsOffset + index + basicFiltersOffset + 1]"
            @edit="onEdit(rowLink)">
            <GridEditRowCell
                :params="rowLink"
                @edit="onEdit" />
        </GridCell>
    </div>
</template>

<script>
export default {
    name: 'GridColumnEdit',
    components: {
        GridPresentationEditHeaderCell: () => import('~/core/components/Grid/PresentationCells/GridPresentationEditHeaderCell'),
        GridCell: () => import('~/core/components/Grid/GridCell'),
        GridEditRowCell: () => import('~/core/components/Grid/EditCells/GridEditRowCell'),
    },
    props: {
        columnIndex: {
            type: Number,
            required: true,
        },
        rowsOffset: {
            type: Number,
            default: 0,
        },
        rowLinks: {
            type: Array,
            required: true,
        },
        isPinned: {
            type: Boolean,
            required: true,
        },
        isBasicFilters: {
            type: Boolean,
            default: true,
        },
        isSelectedAllRows: {
            type: Boolean,
            required: true,
        },
        selectedRows: {
            type: Object,
            required: true,
        },
    },
    computed: {
        pinnedColumnClass() {
            return [
                'pinned-column',
                {
                    'pinned-column--right': this.isPinned,
                },
            ];
        },
        basicFiltersOffset() {
            return this.isBasicFilters ? 1 : 0;
        },
    },
    methods: {
        onEdit(route) {
            this.$emit('editRow', route);
        },
    },
};
</script>

<style lang="scss" scoped>
    .pinned-column {
        position: sticky;
        right: 0;
        z-index: $Z_INDEX_LVL_3;
        display: grid;
        box-sizing: border-box;

        &--right {
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
