/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="designer-background-layer">
        <slot />
        <template v-for="item in numberOfItems">
            <slot
                name="item"
                :column="getColumn(item - 1)"
                :row="getRow(item - 1)" />
        </template>
    </div>
</template>

<script>
export default {
    name: 'DesignerBackgroundLayer',
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
    },
    computed: {
        numberOfItems() {
            return this.columns * this.rows;
        },
    },
    methods: {
        getColumn(index) {
            return index % this.columns;
        },
        getRow(index) {
            return Math.floor(index / this.columns);
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer-background-layer {
        position: absolute;
        top: 0;
        z-index: $Z_INDEX_LVL_0;
        display: grid;
        width: 100%;
        height: auto;
    }
</style>
