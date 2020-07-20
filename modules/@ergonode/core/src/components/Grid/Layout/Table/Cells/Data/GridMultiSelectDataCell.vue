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
        @edit="onEditCell"
        @copy="onCopyValues">
        <template v-if="cellData.value && cellData.value.length">
            <GridPresentationCell :value="presentationValue" />
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
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import GridSuffixPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridSuffixPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';

export default {
    name: 'GridMultiSelectDataCell',
    components: {
        GridPresentationCell,
        GridSuffixPresentationCell,
        IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            if (this.draft !== null && !arraysAreEqual(this.data.value, this.draft)) {
                return {
                    value: this.draft,
                    isDraft: true,
                };
            }

            return {
                value: this.data.value,
                isDraft: false,
            };
        },
        options() {
            if (this.column.filter
                && this.column.filter.options
                && !Array.isArray(this.column.filter.options)) {
                return this.column.filter.options;
            }

            return {};
        },
        presentationValue() {
            const {
                value,
            } = this.cellData;

            return value.map((option) => {
                if (typeof this.options[option] === 'undefined') {
                    return '';
                }

                return this.options[option].label || `#${this.options[option].code}`;
            }).join(', ');
        },
    },
    methods: {
        onEditCell() {
            this.$emit('editCell', {
                type: this.column.type,
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.cellData.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    languageCode: this.languageCode,
                    options: this.options,
                    rowId: this.rowId,
                    columnId: this.column.id,
                    errorMessages: this.errorMessages,
                },
            });
        },
    },
};
</script>
