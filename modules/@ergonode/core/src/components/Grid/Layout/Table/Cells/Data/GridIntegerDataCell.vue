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
        :edit-key-code="editKeyCode"
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
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import {
    cellDataCompose,
} from '@Core/models/mappers/gridDataMapper';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridIntegerDataCell',
    components: {
        GridPresentationCell,
        GridSuffixPresentationCell: () => import('@Core/components/Grid/Layout/Table/Cells/Presentation/GridSuffixPresentationCell'),
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            const check = (data, draftValue) => +data !== +draftValue;
            const getMappedValue = cellDataCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.column.id);
        },
    },
    methods: {
        ...mapActions('grid', [
            'setEditCell',
        ]),
        onEditCell() {
            this.setEditCell({
                row: this.rowIndex,
                column: this.columnIndex,
                type: 'NUMERIC',
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.cellData.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    errorMessages: this.errorMessages,
                    onValueChange: this.onValueChange,
                },
            });
        },
    },
};
</script>
