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
        @edit="onAttachValueChange"
        @mousedown.native="onAttachValueChange">
        <GridBoolEditCell
            :value="cellData.value"
            :disabled="isLocked || isDisabled" />
    </GridTableCell>
</template>

<script>
import GridBoolEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridBoolEditCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridMediaAttachDataCell',
    components: {
        GridBoolEditCell,
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            if (this.draft !== null && Boolean(this.data.value) !== Boolean(this.draft)) {
                return {
                    value: this.draft,
                    isDraft: true,
                };
            }

            return {
                value: this.data.value,
                isDraft: false,
            };
        },
    },
    methods: {
        onAttachValueChange() {
            if (!this.isLocked) {
                this.onValueChange(!this.cellData.value);
            }
        },
    },
};
</script>
