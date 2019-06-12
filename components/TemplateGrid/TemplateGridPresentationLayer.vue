/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['presentation-layer', {'presentation-layer__border-top': !isHeader}]"
        :style="gridStyles">
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
        isHeader: {
            type: Boolean,
            required: false,
            default: true,
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
        display: grid;
        height: auto;
        border-right: 1px dashed $grey;

        &__border-top {
            border-top: 1px dashed $grey;
        }
    }
</style>
