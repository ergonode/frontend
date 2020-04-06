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
        :copyable="isCopyable">
        <template #default="{ isEditing }">
            <GridDateEditCell
                v-if="isEditing"
                :value="value"
                :format="format"
                :width="$el.offsetWidth"
                :height="$el.offsetHeight"
                @input="onValueChange" />
            <GridPresentationCell
                v-else-if="!isEditing && value"
                :value="value"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import { DEFAULT_FORMAT } from '@Core/models/calendar/calendar';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';

export default {
    name: 'GridDateDataCell',
    components: {
        GridPresentationCell,
        GridTableCell,
        GridDateEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridDateEditCell'),
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        format: {
            type: String,
            default: DEFAULT_FORMAT,
        },
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
        isCopyable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        value() {
            if (!this.data.value) return '';

            return this.data.value;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('data', value);
        },
    },
};
</script>
