/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="pinnedColumnClass">
        <GridCell
            :column="columnIndex"
            :row="0"
            :editing-allowed="false"
            :action-cell="false"
            :locked="true">
            <GridEditHeaderCell />
        </GridCell>
        <GridCell
            v-if="basicFilters"
            :column="columnIndex"
            :row="1"
            :editing-allowed="false"
            :action-cell="false"
            :locked="true" />
        <GridCell
            v-for="(rowLink, index) in rowLinks"
            :key="rowLink.id"
            :column="columnIndex"
            :row="index + rowsOffset"
            :editing-allowed="true"
            :action-cell="true"
            :selected="isSelectedAllRows
                || selectedRows[(index + rowsOffset) * currentPage]"
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
        GridEditHeaderCell: () => import('~/components/Grid/HeaderCells/GridEditHeaderCell'),
        GridCell: () => import('~/components/Grid/GridCell'),
        GridEditRowCell: () => import('~/components/Grid/EditCells/GridEditRowCell'),
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
    },
};
</script>

<style lang="scss" scoped>
    .pinned-column {
        position: sticky;
        right: 0;
        z-index: 3;
        display: grid;
        box-sizing: border-box;

        &--right {
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
