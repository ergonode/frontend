/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
import GridFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridFilterPresentationCell';
import gridDataFilterCellMixin from '@Core/mixins/grid/cell/gridDataFilterCellMixin';
import {
    DEFAULT_FORMAT,
} from '@Core/models/calendar/calendar';

export default {
    name: 'GridDateFilterDataCell',
    components: {
        GridFilterPresentationCell,
    },
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
                    bounds: this.$el.getBoundingClientRect(),
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
