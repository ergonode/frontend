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
        @edit="onValueChange(!cellData.value)"
        @copy="onCopyValues">
        <GridBoolEditCell
            :value="cellData.value"
            :suffix="data.suffix"
            :is-disabled="isLocked"
            @input="onValueChange" />
    </GridTableCell>
</template>

<script>
import GridBoolEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridBoolEditCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import { cellDataCompose } from '@Core/models/mappers/gridDataMapper';
import { mapState } from 'vuex';

export default {
    name: 'GridBoolDataCell',
    components: {
        GridBoolEditCell,
    },
    mixins: [gridDataCellMixin],
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        cellData() {
            const check = (data, draftValue) => Boolean(data) !== Boolean(draftValue);
            const getMappedValue = cellDataCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.column.id);
        },
    },
};
</script>
