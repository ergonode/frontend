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
        <template>
            <GridBoolPresentationCell
                :value="value"
                :is-disabled="isLocked" />
        </template>
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridBoolPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridBoolPresentationCell';

export default {
    name: 'GridTextDataCell',
    components: {
        GridBoolPresentationCell,
        GridTableCell,
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
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
