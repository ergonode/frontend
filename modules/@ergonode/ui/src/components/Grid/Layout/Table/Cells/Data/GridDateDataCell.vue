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
        <template v-if="presentationValue">
            <GridPresentationCell :value="presentationValue" />
            <GridSuffixPresentationCell
                v-if="data.suffix"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import GridPresentationCell from '@UI/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import GridSuffixPresentationCell from '@UI/components/Grid/Layout/Table/Cells/Presentation/GridSuffixPresentationCell';
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';
import {
    DEFAULT_DATE_TIME_FORMAT,
} from '@UI/models/calendar';
import {
    format as formatDate,
    parseISO,
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

            let format = DEFAULT_DATE_TIME_FORMAT;

            if (this.column.parameters && this.column.parameters.format) {
                format = this.column.parameters.format;
            }

            return formatDate(parseISO(this.cellData.value), format);
        },
    },
    methods: {
        onEditCell() {
            this.$emit('edit-cell', {
                type: this.column.type,
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.presentationValue,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    format: this.column.parameters && this.column.parameters.format
                        ? this.column.parameters.format
                        : DEFAULT_DATE_TIME_FORMAT,
                    disabled: this.isLocked,
                    rowId: this.rowId,
                    columnId: this.column.id,
                    errorMessages: this.errorMessages,
                },
            });
        },
    },
};
</script>
