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
        :selected="isSelected"
        @edit="onBoolValueChange"
        @mousedown="onBoolValueChange"
        @copy="onCopyValues">
        <GridBoolEditCell
            :value="cellData.value"
            :is-disabled="isLocked" />
        <GridSuffixPresentationCell
            v-if="data.suffix"
            :suffix="data.suffix" />
    </GridTableCell>
</template>

<script>
import GridBoolEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridBoolEditCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import {
    cellDataCompose,
} from '@Core/models/mappers/gridDataMapper';

export default {
    name: 'GridBoolDataCell',
    components: {
        GridBoolEditCell,
        GridSuffixPresentationCell: () => import('@Core/components/Grid/Layout/Table/Cells/Presentation/GridSuffixPresentationCell'),
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            const check = (data, draftValue) => Boolean(data) !== Boolean(draftValue);
            const getMappedValue = cellDataCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.column.id);
        },
    },
    methods: {
        onBoolValueChange() {
            this.onValueChange(!this.cellData.value);
        },
    },
};
</script>
