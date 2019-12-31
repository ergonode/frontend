/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="pinnedColumnClass">
        <GridCell
            :column="columnIndex"
            :row="getRowIndex(0)"
            :spacebar-edition="false"
            :locked="true">
            <GridPresentationEditHeaderCell />
        </GridCell>
        <GridCell
            v-if="basicFilters"
            :column="columnIndex"
            :row="getRowIndex(1)"
            :spacebar-edition="false"
            :locked="true" />
        <GridCell
            v-for="(rowLink, index) in rowLinks"
            :key="rowLink.id"
            :column="columnIndex"
            :row="getRowIndex(index + rowsOffset)"
            :spacebar-edition="true"
            :selected="isSelectedAllRows
                || selectedRows[getRowIndex(index + rowsOffset)]"
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
        basicFilters: {
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
                    'pinned-column--right': this.isPinned,
                },
            ];
        },
    },
    methods: {
        onEdit(route) {
            this.$emit('rowEdit', route);
        },
        getRowIndex(index) {
            return index
                + ((this.currentPage - 1) * this.numberOfDisplayedElements);
        },
    },
};
</script>

<style lang="scss" scoped>
    .pinned-column {
        position: sticky;
        right: 0;
        z-index: $Z_INDEX_LVL_2;
        display: grid;
        box-sizing: border-box;

        &--right {
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
