/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="template-grid-placeholder-item">
        <IconDragDrop size="16" />
        Drag & drop the attribute here
    </div>
</template>

<script>
import IconDragDrop from '@Core/components/Icons/Actions/IconDragDrop';

export default {
    name: 'TemplateGridPlaceholderItem',
    components: {
        IconDragDrop,
    },
};
</script>

<style lang="scss" scoped>
    .template-grid-placeholder-item {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        grid-column-gap: 8px;
        grid-area: 1 / 1 / 2 / 2;
        align-items: center;
        padding: 0 12px;
        margin: 8px;
        background-color: $GREY_LIGHT;
        box-shadow: $ELEVATOR_HOLE;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
    }
</style>
