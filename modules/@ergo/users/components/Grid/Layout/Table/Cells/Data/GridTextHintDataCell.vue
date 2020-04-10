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
        :error="Boolean(errorMessages)"
        :edit-key-code="editKeyCode"
        :disabled="isDisabled"
        :copyable="isCopyable"
        @copy="onCopyValues">
        <GridHintPresentationCell
            :value="mappedValue.value"
            :hint="data.hint"
            :suffix="data.suffix" />
    </GridTableCell>
</template>
<script>
import { mapState } from 'vuex';
import GridHintPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridHintPresentationCell';
import { mappedValueCompose } from '@Core/models/mappers/gridDataMapper';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridTextHintDataCell',
    components: {
        GridHintPresentationCell,
    },
    mixins: [gridDataCellMixin],
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        mappedValue() {
            const check = (data, draftValue) => data !== draftValue;
            const getMappedValue = mappedValueCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.columnId);
        },
    },
};
</script>
