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
        <template v-if="presentationValue">
            <GridPresentationCell :value="presentationValue" />
            <GridSuffixPresentationCell
                v-if="data.suffix"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import GridSuffixPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridSuffixPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import {
    DEFAULT_FORMAT,
} from '@Core/models/calendar/calendar';
import {
    format as formatDate,
} from 'date-fns';

export default {
    name: 'GridDateDataCell',
    components: {
        GridPresentationCell,
        GridSuffixPresentationCell,
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        presentationValue() {
            if (!this.cellData.value) {
                return '';
            }

            let format = DEFAULT_FORMAT;

            if (this.column.parameters && this.column.parameters.format) {
                format = this.column.parameters.format;
            }

            return formatDate(new Date(this.cellData.value), format);
        },
    },
    methods: {
        onEditCell() {
            this.$emit('editCell', {
                type: this.column.type,
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.presentationValue,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    format: this.column.parameters && this.column.parameters.format
                        ? this.column.parameters.format
                        : DEFAULT_FORMAT,
                    rowId: this.rowId,
                    columnId: this.column.id,
                    errorMessages: this.errorMessages,
                },
            });
        },
    },
};
</script>
