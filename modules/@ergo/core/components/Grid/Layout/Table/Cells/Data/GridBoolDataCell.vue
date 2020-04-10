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
    methods: {
        onEditValue() {
            this.$emit('input', !this.mappedValue.value);
        },
    },
};
</script>
