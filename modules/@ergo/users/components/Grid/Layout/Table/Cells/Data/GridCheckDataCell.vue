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
import { mappedValueCompose } from '@Core/models/mappers/gridDataMapper';

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
            const check = (data, draftValue) => Boolean(data) !== Boolean(draftValue);
            const getMappedValue = mappedValueCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.columnId);
        },
    },
};
</script>
