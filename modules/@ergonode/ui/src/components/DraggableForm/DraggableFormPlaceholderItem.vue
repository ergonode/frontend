/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="draggable-form-placeholder-item">
        <IconDragDrop />
        Drag & drop the item here
    </div>
</template>

<script>
export default {
    name: 'DraggableFormPlaceholderItem',
};
</script>

<style lang="scss" scoped>
.draggable-form-placeholder-item {
    z-index: $Z_INDEX_LVL_1;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: max-content;
    grid-column-gap: 8px;
    align-items: center;
    height: 48px;
    margin: 0 40px 0 32px;
    padding-left: 12px;
    box-sizing: border-box;
    background-color: $GREY_LIGHT;
    box-shadow: $ELEVATOR_HOLE;
    color: $GRAPHITE;
    font: $FONT_BOLD_12_16;
    text-transform: uppercase;
}
</style>
