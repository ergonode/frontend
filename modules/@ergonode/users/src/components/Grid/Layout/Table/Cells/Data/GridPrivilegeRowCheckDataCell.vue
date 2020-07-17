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
        :edit-key-code="32"
        :disabled="isDisabled"
        :copyable="isCopyable"
        @edit="onCheckValueChange"
        @mousedown="onCheckValueChange"
        @copy="onCopyValues">
        <GridCheckEditCell
            :value="cellData.value"
            :disabled="isLocked || isDisabled" />
    </GridTableCell>
</template>

<script>
import GridCheckEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridPrivilegeRowCheckDataCell',
    components: {
        GridCheckEditCell,
    },
    mixins: [
        gridDataCellMixin,
    ],
    methods: {
        onCheckValueChange() {
            this.onValueChange(!this.cellData.value);
        },
    },
};
</script>
