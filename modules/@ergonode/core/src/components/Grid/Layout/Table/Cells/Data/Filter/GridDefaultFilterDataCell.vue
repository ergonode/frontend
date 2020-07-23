/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        @edit="onEditCell">
        <GridFilterPresentationCell :value="presentationValue" />
    </GridTableCell>
</template>

<script>
import GridFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridFilterPresentationCell';
import gridDataFilterCellMixin from '@Core/mixins/grid/cell/gridDataFilterCellMixin';

export default {
    name: 'GridDefaultFilterDataCell',
    components: {
        GridFilterPresentationCell,
    },
    mixins: [
        gridDataFilterCellMixin,
    ],
};
</script>
