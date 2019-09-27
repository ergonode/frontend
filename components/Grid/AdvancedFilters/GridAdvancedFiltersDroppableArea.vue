/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="droppable-area"
        draggable
        @drop="onDrop"
        @dragover="onDragOver">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridAdvancedFiltersDroppableArea',
    methods: {
        onDrop(event) {
            this.$emit('addFilter', event.dataTransfer.getData('text/plain'));
        },
        onDragOver(event) {
            event.preventDefault();
        },
    },
};
</script>

<style lang="scss" scoped>
    .droppable-area {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 8px;
        overflow: auto;

        & > * {
            margin: 0 8px 8px 0;
        }
    }
</style>
