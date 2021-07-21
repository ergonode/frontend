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
        :edit-key-code="32"
        :disabled="isDisabled"
        :copyable="isCopyable"
        :selected="isSelected"
        @edit="onBoolValueChange"
        @mousedown.native="onBoolValueChange">
        <GridBoolEditCell
            :value="cellData.value"
            :disabled="isLocked || isDisabled" />
        <GridSuffixPresentationCell
            v-if="data.suffix"
            :suffix="data.suffix" />
    </GridTableCell>
</template>

<script>
import GridBoolEditCell from '@UI/components/Grid/Layout/Table/Cells/Edit/GridBoolEditCell';
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';

export default {
    name: 'GridBoolDataCell',
    components: {
        GridBoolEditCell,
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            if (this.isDraft && Boolean(this.data.value) !== Boolean(this.draft)) {
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
        onBoolValueChange() {
            if (!this.isLocked && !this.isDisabled) {
                this.onValueChange(!this.cellData.value);
            }
        },
    },
};
</script>
