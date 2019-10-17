/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridBaseColumn
        :style="colGridTemplate"
        :border-right="false">
        <GridCell
            :column="columnIndex"
            :row="0"
            :editing-allowed="false"
            :action-cell="false"
            :locked="true">
            <GridEditHeaderCell />
        </GridCell>
        <GridCell
            :column="columnIndex"
            :row="1"
            :editing-allowed="false"
            :action-cell="false"
            :locked="true" />
        <GridCell
            v-for="(rowLink, index) in rowLinks"
            :key="rowLink.id"
            :column="columnIndex"
            :row="index + 2"
            :editing-allowed="true"
            :action-cell="true"
            :selected="isSelectedAllRows
                || selectedRows[(index + 2)
                    * currentPage]"
            @edit="onEdit(rowLink)">
            <GridEditRowCell
                :params="rowLink"
                @edit="onEdit" />
        </GridCell>
    </GridBaseColumn>
</template>

<script>
export default {
    name: 'GridEditColumn',
    components: {
        GridBaseColumn: () => import('~/components/Grid/Columns/GridBaseColumn'),
        GridEditHeaderCell: () => import('~/components/Grid/HeaderCells/GridEditHeaderCell'),
        GridCell: () => import('~/components/Grid/GridCell'),
        GridEditRowCell: () => import('~/components/Grid/EditCells/GridEditRowCell'),
    },
    props: {
        columnIndex: {
            type: Number,
            required: true,
        },
        rowLinks: {
            type: Array,
            required: true,
        },
        rowHeight: {
            type: Number,
            default: 40,
        },
        routePath: {
            type: String,
            required: true,
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
        colGridTemplate() {
            return {
                gridAutoRows: `${this.rowHeight}px`,
            };
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
    .column {
        .grid-cell:nth-child(1) {
            position: sticky !important;
            top: 0;
            z-index: 8;
            background-color: $background;
        }
    }
</style>
