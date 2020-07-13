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
            :is-disabled="isLocked" />
    </GridTableCell>
</template>

<script>
import GridBoolEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridBoolEditCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import {
    cellDataCompose,
} from '@Core/models/mappers/gridDataMapper';

import GridEditNavigationCell from '../Navigation/GridEditNavigationCell';

export default {
    name: 'GridAttachDataCell',
    components: {
        GridBoolEditCell,
        GridEditNavigationCell,
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
        onAttachValueChange() {
            if (!this.column.multiple) {
                if (typeof this.drafts[this.column.data] === 'undefined') {
                    this.setDrafts({
                        [this.column.data]: {
                            [this.column.id]: false,
                        },
                    });
                } else {
                    const lastSelectedDraftKey = Object.keys(this.drafts)
                        .find(key => this.drafts[key][this.column.id]);

                    if (lastSelectedDraftKey !== this.rowId) {
                        this.setDrafts({
                            [lastSelectedDraftKey]: {
                                [this.column.id]: false,
                            },
                        });
                    }
                }
            }

            this.onValueChange(!this.cellData.value);
        },
    },
};
</script>
