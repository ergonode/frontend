/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="designer-ghost-item">
        <IconAddFilter :fill-color="whiteColor" />
        ADD ITEM
    </div>
</template>
<script>
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconAddFilter from '@UI/components/Icons/Actions/IconAddFilter';
import {
    GRID_GAP,
    ROW_HEIGHT,
} from '@UI/defaults/designer';

export default {
    name: 'DesignerGhostItem',
    components: {
        IconAddFilter,
    },
    props: {
        row: {
            type: Number,
            default: 0,
        },
        column: {
            type: Number,
            default: 0,
        },
        gap: {
            type: Number,
            default: GRID_GAP,
        },
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT,
        },
        width: {
            type: Number,
            default: 2,
        },
        height: {
            type: Number,
            default: 1,
        },
    },
    computed: {
        styles() {
            return {
                gridArea: `${this.row + 1} / ${this.column + 1} / ${this.row + 1 + this.height} / ${this.column + 1 + this.width}`,
                margin: `${this.gap}px`,
                height: `${this.rowHeight * this.height - (2 * this.gap)}px`,
            };
        },
        whiteColor() {
            return WHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer-ghost-item {
        z-index: $Z_INDEX_LVL_1;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        grid-column-gap: 8px;
        align-items: center;
        box-sizing: border-box;
        background-color: $GREEN;
        box-shadow: $ELEVATOR_HOLE;
        color: $WHITE;
        font: $FONT_BOLD_12_16;
        text-transform: uppercase;
        padding-left: 12px;
    }
</style>
