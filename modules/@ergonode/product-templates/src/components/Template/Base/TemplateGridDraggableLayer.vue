/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="template-grid-draggable-layer">
        <TemplateGridLayerItem
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
        TemplateGridLayerItem: () => import('@Templates/components/Template/Base/TemplateGridLayerItem'),
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
            this.$emit('drop', position);
        },
    },
};
</script>

<style lang="scss" scoped>
    .template-grid-draggable-layer {
        position: relative;
        z-index: $Z_INDEX_LVL_3;
        display: grid;
        height: 0;
        flex-grow: 1;
        border-top: $BORDER_DASHED_GREY;
        border-right: $BORDER_DASHED_GREY;
    }
</style>
