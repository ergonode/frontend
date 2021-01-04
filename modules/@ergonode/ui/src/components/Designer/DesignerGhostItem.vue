/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="designer-ghost-item">
        <div class="container">
            <IconAddFilter :fill-color="whiteColor" />
            ADD ITEM
        </div>
    </div>
</template>
<script>
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconAddFilter from '@UI/components/Icons/Actions/IconAddFilter';
import {
    GRID_GAP,
} from '@UI/defaults/designer';

export default {
    name: 'TemplateGridGhostItem',
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
    },
    computed: {
        styles() {
            return {
                gridArea: `${this.row + 1} / ${this.column + 1} / ${this.row + 2} / ${this.column + 3}`,
                margin: `${this.gap}px`,
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
        display: flex;
        align-items: center;
        box-sizing: border-box;
        background-color: $GREEN;
        box-shadow: $ELEVATOR_HOLE;
        color: $WHITE;
        font: $FONT_BOLD_12_16;
        text-transform: uppercase;
        padding-left: 12px;

        .container {
            display: grid;
            grid-column-gap: 8px;
            grid-auto-flow: column;
            grid-template-columns: max-content;
            align-items: center;
            color: $WHITE;
            font: $FONT_BOLD_12_16;
        }
    }
</style>
