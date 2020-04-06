/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :draft="isDraftValue"
        :disabled="isDisabled"
        :copyable="isCopyable">
        <template #default="{ isEditing }">
            <GridNumericEditCell
                v-if="isEditing"
                :value="isDraftValue ? draftValue : data.value"
                :width="$el.offsetWidth"
                @input="onValueChange" />
            <GridPresentationCell
                v-else-if="!isEditing && (Number.isInteger(data.value) || isDraftValue)"
                :value="isDraftValue ? draftValue : data.value"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';

export default {
    name: 'GridNumericDataCell',
    components: {
        GridPresentationCell,
        GridTableCell,
        GridNumericEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridNumericEditCell'),
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        draftValue: {
            type: Number,
            default: null,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        columnId: {
            type: String,
            required: true,
        },
        rowId: {
            type: String,
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
        isDraftValue() {
            return this.data.value !== this.draftValue && this.draftValue !== null;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', {
                rowId: this.rowId,
                columnId: this.columnId,
                value,
            });
        },
        onCopyValues(payload) {
            this.$emit('copy', {
                ...payload,
                value: this.value,
                rowId: this.rowId,
                columnId: this.columnId,
            });
        },
    },
};
</script>
