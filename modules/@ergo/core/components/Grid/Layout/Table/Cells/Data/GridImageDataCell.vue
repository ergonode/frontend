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
        @copy="onCopyValues">
        <template #default="{ isEditing }">
            <GridImageEditCell
                v-if="isEditing"
                :value="cellData.value"
                :width="304"
                @input="onValueChange" />
            <GridImagePresentationCell
                v-else-if="!isEditing && cellData.value"
                :value="cellData.value"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import { mapState } from 'vuex';
import { cellDataCompose } from '@Core/models/mappers/gridDataMapper';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import GridImagePresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridImagePresentationCell';

export default {
    name: 'GridImageDataCell',
    components: {
        GridImagePresentationCell,
        GridImageEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridImageEditCell'),
    },
    mixins: [gridDataCellMixin],
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        cellData() {
            const check = (data, draftValue) => data !== draftValue;
            const getMappedValue = cellDataCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.columnId);
        },
    },
};
</script>
