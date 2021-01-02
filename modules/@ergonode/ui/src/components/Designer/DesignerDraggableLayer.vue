/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="designer-draggable-layer">
        <!--        <DesignerBackgroundItem-->
        <!--            v-for="(position, index) in gridLayerPositions"-->
        <!--            :key="index"-->
        <!--            :style="{ gridArea: `${position.row} / ${position.column} / auto / auto` }"-->
        <!--            :position="position"-->
        <!--            :highlighting-positions="highlightedPositions"-->
        <!--            @drop="onDrop" />-->
        <slot />
    </div>
</template>

<script>
// import DesignerBackgroundItem from '@Templates/components/Template/Base/DesignerBackgroundItem';

export default {
    name: 'DesignerDraggableLayer',
    components: {
        // DesignerBackgroundItem,
    },
    props: {
        // columnsNumber: {
        //     type: Number,
        //     required: true,
        // },
        // rowsNumber: {
        //     type: Number,
        //     required: true,
        // },
        // highlightedPositions: {
        //     type: Array,
        //     default: () => [],
        // },
    },
    // computed: {
    //     gridLayerPositions() {
    //         const length = this.rowsNumber * this.columnsNumber;
    //         const positions = [];
    //
    //         for (let i = 1; i <= length; i += 1) {
    //             const row = Math.ceil(i / this.columnsNumber);
    //             const tmpColumn = i % this.columnsNumber;
    //             const column = tmpColumn !== 0 ? tmpColumn : this.columnsNumber;
    //
    //             positions.push({
    //                 row,
    //                 column,
    //             });
    //         }
    //
    //         return positions;
    //     },
    // },
    // methods: {
    //     onDrop(payload) {
    //         this.$emit('drop', payload);
    //     },
    // },
};
</script>

<style lang="scss" scoped>
    .designer-draggable-layer {
        position: relative;
        display: grid;
        flex: 1;
    }
</style>
