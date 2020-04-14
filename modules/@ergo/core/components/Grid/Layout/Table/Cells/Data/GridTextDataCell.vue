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
        <template #default="{ isEditing }">
            <GridTextEditCell
                v-if="isEditing"
                :value="mappedValue.value"
                :width="$el.offsetWidth"
                @input="onValueChange" />
            <GridPresentationCell
                v-else-if="!isEditing && mappedValue.value"
                :value="mappedValue.value"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>
<script>
import { mapState } from 'vuex';
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridTextDataCell',
    components: {
        GridPresentationCell,
        GridTextEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridTextEditCell'),
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
                    isDraft: this.data.value !== draftValue,
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
