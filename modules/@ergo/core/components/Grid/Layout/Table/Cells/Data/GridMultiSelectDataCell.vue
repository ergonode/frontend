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
            <GridMultiSelectEditCell
                v-if="isEditing"
                :value="mappedValue.value"
                :language-code="languageCode"
                :options="options"
                :width="$el.offsetWidth"
                :height="$el.offsetHeight"
                @input="onValueChange" />
            <GridMultiSelectPresentationCell
                v-else-if="!isEditing"
                :value="mappedValue.value"
                :suffix="data.suffix"
                :options="options" />
        </template>
    </GridTableCell>
</template>

<script>
import { mapState } from 'vuex';
import GridMultiSelectPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridMultiSelectPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import { mappedValueCompose } from '@Core/models/mappers/gridDataMapper';
import { arraysAreEqual } from '@Core/models/arrayWrapper';

export default {
    name: 'GridMultiSelectDataCell',
    components: {
        GridMultiSelectPresentationCell,
        GridMultiSelectEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridMultiSelectEditCell'),
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
    },
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        mappedValue() {
            const check = (data, draftValue) => !arraysAreEqual(data, draftValue);
            const getMappedValue = mappedValueCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.columnId);
        },
    },
};
</script>
