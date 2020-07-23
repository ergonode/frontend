/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :draft="cellData.isDraft"
        :selected="isSelected"
        :error="Boolean(errorMessages)"
        :disabled="isDisabled">
        <GridHintPresentationCell
            :value="cellData.value"
            :hint="data.hint" />
    </GridTableCell>
</template>
<script>
import GridHintPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridHintPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridPrivilegeNameHintDataCell',
    components: {
        GridHintPresentationCell,
    },
    mixins: [
        gridDataCellMixin,
    ],
};
</script>
