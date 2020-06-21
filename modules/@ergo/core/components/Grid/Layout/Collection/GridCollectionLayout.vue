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
            :actions="element.actions"
            :image="element.image"
            :description="element.description"
            :object-fit="objectFit"
            @edit="onEditCell" />
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
            default: () => [
            ],
        },
        columnsNumber: {
            type: Number,
            required: true,
        },
        objectFit: {
            type: String,
            required: true,
        },
    },
    computed: {
        gridTemplateColumns() {
            return {
                gridTemplateColumns: `repeat(${this.columnsNumber}, 1fr)`,
            };
        },
    },
    methods: {
        onEditCell(args) {
            this.$emit('editRow', args);
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
