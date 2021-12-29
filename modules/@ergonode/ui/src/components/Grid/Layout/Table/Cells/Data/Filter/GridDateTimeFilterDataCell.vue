/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        @edit="onEditCell">
        <GridFilterPresentationCell
            placeholder="Select..."
            :value="presentationValue" />
    </GridTableCell>
</template>

<script>
import gridDataFilterCellMixin from '@UI/mixins/grid/gridDataFilterCellMixin';
import {
    DEFAULT_FORMAT,
} from '@UI/models/calendar';

export default {
    name: 'GridDateTimeFilterDataCell',
    mixins: [
        gridDataFilterCellMixin,
    ],
    computed: {
        dateFormat() {
            if (!this.data.parameters) {
                return DEFAULT_FORMAT;
            }

            return this.data.parameters.format;
        },
    },
    methods: {
        onEditCell() {
            this.$emit('edit-filter-cell', {
                type: this.data.type,
                props: {
                    bounds: this.$el.getBoundingClientRect().toJSON(),
                    value: this.value,
                    columnId: this.columnId,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    format: this.dateFormat,
                },
            });
        },
    },
};
</script>
