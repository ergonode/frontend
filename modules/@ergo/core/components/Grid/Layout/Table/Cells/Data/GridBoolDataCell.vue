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
        @edit="onEditValue"
        @copy="onCopyValues">
        <GridBoolEditCell
            :value="mappedValue.value"
            :suffix="data.suffix"
            :is-disabled="isLocked"
            @input="onValueChange" />
    </GridTableCell>
</template>

<script>
import { mapState } from 'vuex';
import GridBoolEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridBoolEditCell';
import { mappedValueCompose } from '@Core/models/mappers/gridDataMapper';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridBoolDataCell',
    components: {
        GridBoolEditCell,
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
    methods: {
        onEditValue() {
            this.$emit('input', !this.mappedValue.value);
        },
    },
};
</script>
