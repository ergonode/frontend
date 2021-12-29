/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';

export default {
    name: 'GridPrivilegeNameHintDataCell',
    mixins: [
        gridDataCellMixin,
    ],
};
</script>
