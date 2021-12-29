/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="designer-placeholder-item">
        <IconDragDrop />
        Drag & drop the item here
    </div>
</template>

<script>
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    GRID_GAP,
    ROW_HEIGHT,
} from '@UI/defaults/designer';

export default {
    name: 'DesignerPlaceholderItem',
    props: {
        row: {
            type: Number,
            default: 0,
        },
        column: {
            type: Number,
            default: 0,
        },
        width: {
            type: Number,
            default: 2,
        },
        height: {
            type: Number,
            default: 1,
        },
        gap: {
            type: Number,
            default: GRID_GAP,
        },
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT,
        },
    },
    computed: {
        styles() {
            const gridRow = this.row + 1;
            const gridColumn = this.column + 1;

            return {
                gridArea: `${gridRow} / ${gridColumn} / ${gridRow + this.height} / ${gridColumn + this.width}`,
                margin: `${this.gap}px`,
                height: `${this.rowHeight - (2 * this.gap)}px`,
            };
        },
        whiteColor() {
            return WHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer-placeholder-item {
        z-index: $Z_INDEX_LVL_1;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        grid-column-gap: 8px;
        align-items: center;
        box-sizing: border-box;
        background-color: $GREY_LIGHT;
        box-shadow: $ELEVATOR_HOLE;
        color: $GRAPHITE;
        font: $FONT_BOLD_12_16;
        text-transform: uppercase;
        padding-left: 12px;
    }
</style>
