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
import { DEFAULT_FORMAT } from '@Core/models/calendar/calendar';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridSelectFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridSelectFilterPresentationCell';

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
        format: {
            type: String,
            default: DEFAULT_FORMAT,
        },
        columnIndex: {
            type: Number,
            required: true,
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
        value() {
            if (!this.filter) return '';

            return this.filter.value;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('filter', value);
        },
    },
};
</script>
