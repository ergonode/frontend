/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :disabled="isDisabled"
        @edit="onEditCell">
        <GridFilterPresentationCell :value="value" />
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridFilterPresentationCell';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';

export default {
    name: 'GridNumericFilterCell',
    components: {
        GridFilterPresentationCell,
        GridTableCell,
    },
    props: {
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            value: '',
        };
    },
    methods: {
        onEditCell() {
            this.$emit('editCell', {
                row: this.rowIndex,
                column: this.columnIndex,
                type: 'NUMERIC',
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                },
            });
        },
        onValueChange(value) {
            this.value = value;

            this.$emit('filter', {
                index: this.columnIndex,
                value: {
                    [FILTER_OPERATOR.EQUAL]: value,
                },
            });
        },
    },
};
</script>
