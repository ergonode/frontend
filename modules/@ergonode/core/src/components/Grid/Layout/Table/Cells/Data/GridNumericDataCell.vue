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
        :error="Boolean(errorMessages)"
        :disabled="isDisabled"
        :copyable="isCopyable"
        :selected="isSelected"
        @edit="onEditCell"
        @copy="onCopyValues">
        <template v-if="cellData.value || cellData.value === 0">
            <GridPresentationCell :value="cellData.value" />
            <GridSuffixPresentationCell
                v-if="data.suffix"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import GridSuffixPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridSuffixPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridNumericDataCell',
    components: {
        GridPresentationCell,
        GridSuffixPresentationCell,
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            if (this.draft !== null && +this.data.value !== +this.draft) {
                return {
                    value: +this.draft,
                    isDraft: true,
                };
            }

            return {
                value: +this.data.value,
                isDraft: false,
            };
        },
    },
};
</script>
