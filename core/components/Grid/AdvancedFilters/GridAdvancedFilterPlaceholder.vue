/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="advanced-filters-placeholder">
        <IconDragDrop size="16" />
        Drag & drop the attribute here
    </div>
</template>

<script>
import IconDragDrop from '~/components/Icon/Actions/IconDragDrop';

export default {
    name: 'GridAdvancedFilterPlaceholder',
    components: {
        IconDragDrop,
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filters-placeholder {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 8px;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        background-color: $GREY_LIGHT;
        box-shadow: $ELEVATOR_HOLE;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
    }
</style>
