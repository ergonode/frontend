/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridBaseColumn :style="colGridTemplate">
        <GridCell
            v-for="(row, index) in rowsNumber"
            :key="row"
            :column="columnIndex"
            :row="index"
            :editing-allowed="false"
            :action-cell="false"
            :locked="true"
            :selected="isSelectedAllRows && index > 1
                || selectedRows[(index) * currentPage]" />
    </GridBaseColumn>
</template>

<script>

export default {
    name: 'GridExtenderColumn',
    components: {
        GridBaseColumn: () => import('~/components/Grid/Columns/GridBaseColumn'),
        GridCell: () => import('~/components/Grid/GridCell'),
    },
    props: {
        rowsNumber: {
            type: Number,
            default: 0,
        },
        columnIndex: {
            type: Number,
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
        rowHeight: {
            type: Number,
            default: 40,
        },
    },
    computed: {
        colGridTemplate() {
            return {
                gridAutoRows: `${this.rowHeight}px`,
            };
        },
    },
};
</script>
