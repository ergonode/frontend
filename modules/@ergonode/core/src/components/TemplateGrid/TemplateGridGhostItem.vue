/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="template-grid-ghost-item">
        <IconAddFilter :fill-color="whiteColor" />
        ADD {{ contextName }}
    </div>
</template>
<script>
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconAddFilter from '@UI/components/Icons/Actions/IconAddFilter';

export default {
    name: 'TemplateGridGhostItem',
    components: {
        IconAddFilter,
    },
    props: {
        contextName: {
            type: String,
            default: 'ITEM',
        },
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
            default: 8,
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
    .template-grid-ghost-item {
        position: relative;
        z-index: $Z_INDEX_LVL_1;
        display: grid;
        align-items: center;
        grid-column-gap: 8px;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        background-color: $GREEN;
        box-shadow: $ELEVATOR_HOLE;
        color: $WHITE;
        font: $FONT_BOLD_12_16;
        text-transform: uppercase;
        padding-left: 12px;

        &::before {
            position: absolute;
            left: 0;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: $GREEN;
            content: "";
        }
    }
</style>
