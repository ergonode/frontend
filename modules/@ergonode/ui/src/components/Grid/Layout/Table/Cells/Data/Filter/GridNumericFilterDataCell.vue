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
import GridFilterPresentationCell from '@UI/components/Grid/Layout/Table/Cells/Presentation/GridFilterPresentationCell';
import gridDataFilterCellMixin from '@UI/mixins/grid/gridDataFilterCellMixin';

export default {
    name: 'GridNumericFilterDataCell',
    components: {
        GridFilterPresentationCell,
    },
    mixins: [
        gridDataFilterCellMixin,
    ],
};
</script>
