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
        @edit="onAttachValueChange">
        <GridBoolEditCell
            :value="cellData.value"
            :suffix="data.suffix"
            :is-disabled="isLocked" />
    </GridTableCell>
</template>

<script>
import GridBoolEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridBoolEditCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import {
    cellDataCompose,
} from '@Core/models/mappers/gridDataMapper';
import {
    mapState,
} from 'vuex';

export default {
    name: 'GridAttachDataCell',
    components: {
        GridBoolEditCell,
    },
    mixins: [
        gridDataCellMixin,
    ],
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
    methods: {
        onAttachValueChange() {
            if (!this.column.multiple) {
                if (typeof this.drafts[this.column.data] === 'undefined') {
                    this.setDraftValue({
                        rowId: this.column.data,
                        columnId: this.column.id,
                        value: false,
                    });
                } else {
                    const lastSelectedDraftKey = Object.keys(this.drafts)
                        .find(key => this.drafts[key][this.column.id]);

                    if (lastSelectedDraftKey !== this.rowId) {
                        this.setDraftValue({
                            rowId: lastSelectedDraftKey,
                            columnId: this.column.id,
                            value: false,
                        });
                    }
                }
            }

            this.onValueChange(!this.cellData.value);
        },
    },
};
</script>
