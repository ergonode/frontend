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
            <GridImageEditCell
                v-if="isEditing"
                :value="value"
                :width="$el.offsetWidth"
                @input="onValueChange" />
            <GridImagePresentationCell
                v-show="!isEditing && value"
                :value="value"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridImagePresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridImagePresentationCell';

export default {
    name: 'GridImageDataCell',
    components: {
        GridImagePresentationCell,
        GridTableCell,
        GridImageEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridImageEditCell'),
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
