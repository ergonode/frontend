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
            <GridDateEditCell
                v-if="isEditing"
                :value="mappedValue.value"
                :format="format"
                :width="$el.offsetWidth"
                :height="$el.offsetHeight"
                @input="onValueChange" />
            <GridPresentationCell
                v-else-if="!isEditing"
                :value="mappedValue.value"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import { mapState } from 'vuex';
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import { DEFAULT_FORMAT } from '@Core/models/calendar/calendar';
import { mappedValueCompose } from '@Core/models/mappers/gridDataMapper';

export default {
    name: 'GridDateDataCell',
    components: {
        GridPresentationCell,
        GridDateEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridDateEditCell'),
    },
    mixins: [gridDataCellMixin],
    props: {
        format: {
            type: String,
            default: DEFAULT_FORMAT,
        },
    },
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
