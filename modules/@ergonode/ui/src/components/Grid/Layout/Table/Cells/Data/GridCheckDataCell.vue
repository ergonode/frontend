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
        @edit="onCheckValueChange"
        @mousedown.native="onCheckValueChange">
        <GridCheckEditCell
            :value="cellData.value"
            :disabled="isLocked || isDisabled" />
        <GridSuffixPresentationCell
            v-if="data.suffix"
            :suffix="data.suffix" />
    </GridTableCell>
</template>

<script>
import GridCheckEditCell from '@UI/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell';
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';

export default {
    name: 'GridCheckDataCell',
    components: {
        GridCheckEditCell,
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
        onCheckValueChange() {
            if (!this.isLocked) {
                this.onValueChange(!this.cellData.value);
            }
        },
    },
};
</script>
