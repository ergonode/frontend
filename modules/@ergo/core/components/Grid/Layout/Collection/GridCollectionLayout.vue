/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-collection-layout">
        <GridCollectionCell
            v-for="(element, index) in data"
            :key="index"
            :image="element.image"
            :description="element.description" />
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
    },
};
</script>

<style lang="scss" scoped>
    .grid-collection-layout {
        display: grid;
        grid-template-rows: 190px;
        grid-gap: 24px;
    }
</style>
