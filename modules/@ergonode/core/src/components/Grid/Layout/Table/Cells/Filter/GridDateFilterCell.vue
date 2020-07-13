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
        <GridFilterPresentationCell
            placeholder="Select..."
            :value="value" />
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridFilterPresentationCell';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    DEFAULT_FORMAT,
} from '@Core/models/calendar/calendar';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridDateFilterCell',
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
        data: {
            type: Object,
            default: () => ({}),
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
    computed: {
        dateFormat() {
            if (!this.data.parameters) {
                return DEFAULT_FORMAT;
            }

            return this.data.parameters.format;
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
                type: 'DATE',
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    format: this.dateFormat,
                    onValueChange: this.onValueChange,
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
