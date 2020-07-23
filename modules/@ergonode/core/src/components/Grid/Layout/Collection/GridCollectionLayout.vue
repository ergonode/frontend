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
            :data="element"
            :drafts="drafts"
            :object-fit="objectFit"
            @rowAction="onRowAction"
            @cellValue="onCellValueChange" />
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
        drafts: {
            type: Object,
            default: () => ({}),
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
        onRowAction(payload) {
            this.$emit('rowAction', payload);
        },
        onCellValueChange(payload) {
            this.$emit('cellValue', payload);
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
