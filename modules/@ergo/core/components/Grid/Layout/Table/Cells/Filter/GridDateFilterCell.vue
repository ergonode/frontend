/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :disabled="isDisabled">
        <template #default="{ isEditing }">
            <GridDateEditCell
                v-if="isEditing"
                :value="value"
                :width="$el.offsetWidth"
                :height="$el.offsetHeight"
                @input="onValueChange" />
            <GridSelectFilterPresentationCell
                v-else
                :value="value" />
        </template>
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridSelectFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridSelectFilterPresentationCell';
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import { DEFAULT_FORMAT } from '@Core/models/calendar/calendar';

export default {
    name: 'GridDateFilterCell',
    components: {
        GridSelectFilterPresentationCell,
        GridTableCell,
        GridDateEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridDateEditCell'),
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
        filter: {
            type: Object,
            default: null,
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
    computed: {
        dateFormat() {
            if (!this.data.parameters) {
                return DEFAULT_FORMAT;
            }

            return this.data.parameters.format;
        },
        value() {
            if (!this.filter) return '';

            return this.filter.value;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('filter', {
                index: this.columnIndex,
                value,
                operator: FILTER_OPERATOR.EQUAL,
            });
        },
    },
};
</script>
