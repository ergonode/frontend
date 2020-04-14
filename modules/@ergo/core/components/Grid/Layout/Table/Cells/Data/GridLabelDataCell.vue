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
            <GridLabelEditCell
                v-if="isEditing"
                :value="cellData.value"
                :language-code="languageCode"
                :colors="colors"
                :row-id="rowId"
                :width="$el.offsetWidth"
                :height="$el.offsetHeight"
                @input="onValueChange" />
            <GridLabelPresentationCell
                v-else-if="!isEditing && cellData.value"
                :value="cellData.value"
                :options="options"
                :colors="colors"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import { mapState } from 'vuex';
import { cellDataCompose } from '@Core/models/mappers/gridDataMapper';
import GridLabelPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridLabelPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridLabelDataCell',
    components: {
        GridLabelPresentationCell,
        GridLabelEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridLabelEditCell'),
    },
    mixins: [gridDataCellMixin],
    props: {
        languageCode: {
            type: String,
            default: 'EN',
        },
        options: {
            type: Object,
            default: () => ({}),
        },
        colors: {
            type: Object,
            default: () => ({}),
        },
    },
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
