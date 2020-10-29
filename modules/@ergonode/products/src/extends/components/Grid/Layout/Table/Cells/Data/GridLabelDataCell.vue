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
        :disabled="isDisabled"
        :copyable="isCopyable"
        :selected="isSelected"
        @edit="onEditCell">
        <template v-if="cellData.value">
            <GridLabelPresentationCell
                :value="cellData.value"
                :options="options"
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
import GridLabelPresentationCell from '@Products/extends/components/Grid/Layout/Table/Cells/Presentation/GridLabelPresentationCell';
import GridSuffixPresentationCell from '@UI/components/Grid/Layout/Table/Cells/Presentation/GridSuffixPresentationCell';
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';

export default {
    name: 'GridLabelDataCell',
    components: {
        GridLabelPresentationCell,
        GridSuffixPresentationCell,
        IconArrowDropDown: () => import('@UI/components/Icons/Arrows/IconArrowDropDown'),
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
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
        onEditCell() {
            this.$emit('edit-cell', {
                type: this.column.type,
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.cellData.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    disabled: this.isLocked,
                    colors: this.options,
                    rowId: this.rowId,
                    columnId: this.column.id,
                    errorMessages: this.errorMessages,
                },
            });
        },
    },
};
</script>
