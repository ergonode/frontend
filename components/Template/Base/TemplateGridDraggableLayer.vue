/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="draggable-layer">
        <TemplateGridGhostItem
            v-for="(position, index) in gridLayerPositions"
            :key="index"
            :style="{ gridArea: `${position.row} / ${position.column} / auto / auto` }"
            :position="position"
            :highlighting-positions="highlightedPositions"
            @drop="onDrop" />
        <slot name="elements" />
    </div>
</template>

<script>
export default {
    name: 'TemplateGridDraggableLayer',
    components: {
        TemplateGridGhostItem: () => import('~/components/Template/Base/TemplateGridGhostItem'),
    },
    props: {
        columnsNumber: {
            type: Number,
            required: true,
        },
        rowsNumber: {
            type: Number,
            required: true,
        },
        highlightedPositions: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        gridLayerPositions() {
            const length = this.rowsNumber * this.columnsNumber;
            const positions = [];

            for (let i = 1; i <= length; i += 1) {
                const row = Math.ceil(i / this.columnsNumber);
                const tmpColumn = i % this.columnsNumber;
                const column = tmpColumn !== 0 ? tmpColumn : this.columnsNumber;

                positions.push({
                    row,
                    column,
                });
            }

            return positions;
        },
    },
    methods: {
        onDrop(position) {
            this.$emit('addListElementToLayout', position);
        },
        onEditSectionTitle(index) {
            this.$emit('editSectionTitle', index);
        },
        onResizingElMaxRow(row) {
            this.$emit('resizingElMaxRow', row);
        },
    },
};
</script>

<style lang="scss" scoped>
    $border: 1px dashed $GREY;

    .draggable-layer {
        position: relative;
        z-index: 3;
        display: grid;
        height: 0;
        flex-grow: 1;
        border-top: $border;
        border-right: $border;
    }
</style>
