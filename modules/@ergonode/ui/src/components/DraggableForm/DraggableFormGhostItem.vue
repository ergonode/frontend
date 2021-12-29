/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="draggable-form-ghost-item">
        <IconAddFilter :fill-color="whiteColor" />
        ADD ITEM
    </div>
</template>
<script>
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'DraggableFormGhostItem',
    computed: {
        whiteColor() {
            return WHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .draggable-form-ghost-item {
        z-index: $Z_INDEX_LVL_1;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        grid-column-gap: 8px;
        align-items: center;
        height: 48px;
        box-sizing: border-box;
        background-color: $GREEN;
        box-shadow: $ELEVATOR_HOLE;
        color: $WHITE;
        font: $FONT_BOLD_12_16;
        text-transform: uppercase;
        padding-left: 12px;
    }
</style>
