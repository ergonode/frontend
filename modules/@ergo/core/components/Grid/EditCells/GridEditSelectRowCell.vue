/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :column="0"
        :row="row"
        editing-allowed
        :edit-key-code="32"
        :selected="isSelected"
        @edit="onSelect">
        <GridPresentationCheckCell
            :value="isSelected"
            @input="onSelect" />
    </GridTableCell>
</template>

<script>

export default {
    name: 'GridEditSelectRowCell',
    components: {
        GridTableCell: () => import('@Core/components/Grid/Layout/Table/Cells/GridTableCell'),
        GridPresentationCheckCell: () => import('@Core/components/Grid/PresentationCells/GridPresentationCheckCell'),
    },
    props: {
        row: {
            type: Number,
            required: true,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onSelect() {
            this.$emit('select', { row: this.row, isSelected: !this.isSelected });
        },
    },
};
</script>
