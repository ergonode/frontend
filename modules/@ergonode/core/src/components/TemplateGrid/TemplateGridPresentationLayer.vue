/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <TemplateGridShadowItem
            v-for="(item, index) in numberOfItems"
            :key="item"
            :column-index="index % columns"
            :row-index="Math.floor(index / columns)" />
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
        classes() {
            return [
                'presentation-layer',
                {
                    'presentation-layer__border-top': !this.isHeader,
                },
            ];
        },
        numberOfItems() {
            return this.columns * this.rows;
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
