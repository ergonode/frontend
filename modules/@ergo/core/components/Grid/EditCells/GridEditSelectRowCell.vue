/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :column="0"
        :row="row"
        editing-allowed
        action-cell
        :editing="isSelected"
        :selected="isSelected"
        @edit="onSelect">
        <GridPresentationCheckCell
            :value="isSelected"
            @input="onSelect" />
    </GridCell>
</template>

<script>

export default {
    name: 'GridEditSelectRowCell',
    components: {
        GridCell: () => import('@Core/components/Grid/GridCell'),
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
        onSelect(isSelected) {
            this.$emit('select', { row: this.row, isSelected });
        },
    },
};
</script>
