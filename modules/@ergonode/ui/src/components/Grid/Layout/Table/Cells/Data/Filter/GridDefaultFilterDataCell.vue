/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
import gridDataFilterCellMixin from '@UI/mixins/grid/gridDataFilterCellMixin';

export default {
    name: 'GridDefaultFilterDataCell',
    mixins: [
        gridDataFilterCellMixin,
    ],
};
</script>
