/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['presentation-layer', {'presentation-layer__border-top': !isHeader}]">
        <TemplateGridShadowItem
            v-for="index in numberOfItems"
            :key="index"
            :item-id="index"
            :last-row="markLastRow(index)" />
    </div>
</template>

<script>
import TemplateGridShadowItem from '@Core/components/TemplateGrid/TemplateGridShadowItem';

export default {
    name: 'TemplateGridPresentationLayer',
    components: {
        TemplateGridShadowItem,
    },
    props: {
        /**
         * Number of visible columns
         */
        columns: {
            type: Number,
            required: true,
        },
        /**
         * List of rows presented at Grid
         */
        rows: {
            type: Number,
            required: true,
        },
        /**
         * Determines whether header is visible
         */
        isHeader: {
            type: Boolean,
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
        border-right: $BORDER_DASHED_GREY;

        &__border-top {
            border-top: $BORDER_DASHED_GREY;
        }
    }
</style>
