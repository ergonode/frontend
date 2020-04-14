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
            <GridLabelEditCell
                v-if="isEditing"
                :value="mappedValue.value"
                :language-code="languageCode"
                :colors="colors"
                :row-id="rowId"
                :width="$el.offsetWidth"
                :height="$el.offsetHeight"
                @input="onValueChange" />
            <GridLabelPresentationCell
                v-else-if="!isEditing"
                :value="mappedValue.value"
                :options="options"
                :colors="colors"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import { mapState } from 'vuex';
import { mappedValueCompose } from '@Core/models/mappers/gridDataMapper';
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
        mappedValue() {
            const check = (data, draftValue) => data !== draftValue;
            const getMappedValue = mappedValueCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.columnId);
        },
    },
};
</script>
