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
        :selected="isSelected"
        @copy="onCopyValues">
        <template #default="{ isEditing }">
            <GridNumericEditCell
                v-if="isEditing"
                :value="cellData.value"
                :width="$el.offsetWidth"
                @input="onValueChange" />
            <GridPresentationCell
                v-else-if="!isEditing && (cellData.value || cellData.value === 0)"
                :value="cellData.value"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import { cellDataCompose } from '@Core/models/mappers/gridDataMapper';
import { mapState } from 'vuex';

export default {
    name: 'GridIntegerDataCell',
    components: {
        GridPresentationCell,
        GridNumericEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridNumericEditCell'),
    },
    mixins: [gridDataCellMixin],
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        cellData() {
            const check = (data, draftValue) => +data !== +draftValue;
            const getMappedValue = cellDataCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.column.id);
        },
    },
};
</script>
