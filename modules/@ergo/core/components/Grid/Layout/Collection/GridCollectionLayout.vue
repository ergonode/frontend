/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-collection-layout"
        :style="gridTemplateColumns">
        <GridCollectionCell
            v-for="(element, index) in data"
            :key="index"
            :image="element.image"
            :description="element.description"
            :object-fit="config.objectFit" />
    </div>
</template>

<script>
import GridCollectionCell from '@Core/components/Grid/Layout/Collection/Cells/GridCollectionCell';

export default {
    name: 'GridCollectionLayout',
    components: {
        GridCollectionCell,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        config: {
            type: Object,
            default: () => ({
                columnsNumber: 4,
                objectFit: 'cover',
            }),
        },
    },
    computed: {
        gridTemplateColumns() {
            return {
                gridTemplateColumns: `repeat(${this.config.columnsNumber}, 1fr)`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-collection-layout {
        display: grid;
        grid-template-rows: 190px;
        grid-gap: 24px;
        padding: 24px;
        box-sizing: border-box;
        background-color: $WHITE;
        overflow: auto;
    }
</style>
