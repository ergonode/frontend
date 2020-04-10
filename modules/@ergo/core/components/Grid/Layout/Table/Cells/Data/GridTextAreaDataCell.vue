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
            <GridTextAreaEditCell
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
import { mappedValueCompose } from '@Core/models/mappers/gridDataMapper';

export default {
    name: 'GridTextDataCell',
    components: {
        GridPresentationCell,
        GridTextAreaEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridTextAreaEditCell'),
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
