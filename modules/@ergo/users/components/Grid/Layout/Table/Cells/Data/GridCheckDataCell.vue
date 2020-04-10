/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :draft="mappedValue.isDraft"
        :edit-key-code="32"
        :disabled="isDisabled"
        :copyable="isCopyable"
        @edit="onValueChange(!mappedValue.value)"
        @copy="onCopyValues">
        <GridCheckEditCell
            :value="mappedValue.value"
            :suffix="data.suffix"
            :disabled="isLocked"
            @input="onValueChange" />
    </GridTableCell>
</template>

<script>
import { mapState } from 'vuex';
import GridCheckEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridCheckDataCell',
    components: {
        GridCheckEditCell,
    },
    mixins: [gridDataCellMixin],
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        mappedValue() {
            if (this.drafts[this.rowId]
                && typeof this.drafts[this.rowId][this.columnId] !== 'undefined') {
                const draftValue = this.drafts[this.rowId][this.columnId];

                return {
                    value: draftValue,
                    isDraft: Boolean(this.data.value) !== Boolean(draftValue),
                };
            }

            return {
                value: this.data.value,
                isDraft: false,
            };
        },
    },
};
</script>
