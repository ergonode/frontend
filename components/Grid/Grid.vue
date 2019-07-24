/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['grid', {'grid--placeholder': isPlaceholder}]"
        :style="templateColumns">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Grid',
    props: {
        columns: {
            type: Array,
            required: true,
        },
        isPlaceholder: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            ghostColumnIndex: -1,
            draggedColumnIndex: -1,
            draggedColumn: null,
            columnBounds: [],
        };
    },
    computed: {
        templateColumns() {
            return {
                gridTemplateColumns: this.columnWidths.join(' '),
            };
        },
        columnWidths() {
            return this.columns.map(column => (+column.width ? `minmax(max-content, ${column.width}px)` : column.width));
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        border: 1px solid $grey;
        background-color: $background;
        border-bottom: none;
        overflow: auto;

        &--placeholder {
            flex-shrink: 0;
        }
    }
</style>
