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
        GridCell: () => import('~/core/components/Grid/GridCell'),
        GridPresentationCheckCell: () => import('~/core/components/Grid/PresentationCells/GridPresentationCheckCell'),
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
