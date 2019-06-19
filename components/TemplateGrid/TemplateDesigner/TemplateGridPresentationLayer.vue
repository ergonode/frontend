/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <div class="presentation-layer">
        <TemplateGridShadowItem
            v-for="index in numberOfItems"
            :key="index"
            :item-id="index"
            :last-row="markLastRow(index)" />
    </div>
</template>

<script>
import TemplateGridShadowItem from '~/components/TemplateGrid/TemplateGridShadowItem';

export default {
    name: 'TemplateGridPresentationLayer',
    components: {
        TemplateGridShadowItem,
    },
    props: {
        gridStyles: {
            type: Object,
            required: true,
        },
        columns: {
            type: Number,
            required: true,
        },
        rows: {
            type: Number,
            required: true,
        },
    },
    computed: {
        numberOfItems() {
            return this.columns * this.rows;
        },
    },
    methods: {
        markLastRow(index) {
            return (index - 1) >= this.numberOfItems - this.columns;
        },
    },
};
</script>

<style lang="scss" scoped>
    .presentation-layer {
        position: absolute;
        top: 0;
        left: 0;
        display: grid;
        width: calc(100% - 1px);
        height: auto;
        border-right: 1px dashed $grey;
    }
</style>
