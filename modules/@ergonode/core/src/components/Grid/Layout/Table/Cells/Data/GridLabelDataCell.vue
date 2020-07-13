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
        @edit="onEditCell"
        @copy="onCopyValues">
        <template v-if="cellData.value">
            <GridLabelPresentationCell
                :value="cellData.value"
                :options="options"
                :colors="column.colors"
                :suffix="data.suffix"
                :is-locked="isLocked" />
            <GridSuffixPresentationCell
                v-if="data.suffix"
                :suffix="data.suffix" />
            <IconArrowDropDown
                v-if="!isLocked"
                view-box="0 0 24 24"
                :width="32" />
        </template>
    </GridTableCell>
</template>

<script>
import GridLabelPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridLabelPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import {
    cellDataCompose,
} from '@Core/models/mappers/gridDataMapper';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridLabelDataCell',
    components: {
        GridLabelPresentationCell,
        GridSuffixPresentationCell: () => import('@Core/components/Grid/Layout/Table/Cells/Presentation/GridSuffixPresentationCell'),
        IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            const check = (data, draftValue) => data !== draftValue;
            const getMappedValue = cellDataCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.column.id);
        },
        options() {
            if (this.column.filter
                && this.column.filter.options
                && !Array.isArray(this.column.filter.options)) {
                return this.column.filter.options;
            }

            return {};
        },
    },
    methods: {
        ...mapActions('grid', [
            'setEditCell',
        ]),
        onEditCell() {
            this.setEditCell({
                row: this.rowIndex,
                column: this.columnIndex,
                type: this.column.type,
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.cellData.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    languageCode: this.languageCode,
                    colors: this.column.colors,
                    rowId: this.rowId,
                    errorMessages: this.errorMessages,
                    onValueChange: this.onValueChange,
                },
            });
        },
    },
};
</script>
