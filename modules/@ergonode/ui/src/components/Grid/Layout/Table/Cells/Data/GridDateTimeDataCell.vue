/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';
import {
    DEFAULT_DATE_TIME_FORMAT,
} from '@UI/models/calendar';
import {
    format as formatDate,
} from 'date-fns';

export default {
    name: 'GridDateTimeDataCell',
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        format() {
            return DEFAULT_DATE_TIME_FORMAT;
        },
        presentationValue() {
            if (!this.cellData.value) {
                return '';
            }

            return formatDate(new Date(this.cellData.value), this.format);
        },
    },
    methods: {
        onEditCell() {
            const value = this.cellData.value
                ? new Date(this.cellData.value)
                : null;

            this.$emit('edit-cell', {
                type: this.column.type,
                props: {
                    bounds: this.$el.getBoundingClientRect().toJSON(),
                    value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    format: this.format,
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
