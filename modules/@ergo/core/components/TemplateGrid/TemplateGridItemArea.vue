/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :item-id="item.id"
        :style="gridItemStyles"
        class="grid__item-area">
        <slot />
        <slot name="connection" />
    </div>
</template>
<script>
export default {
    name: 'TemplateGridItemArea',
    props: {
        item: {
            type: Object,
            required: true,
        },
        columns: {
            type: Number,
            required: true,
        },
        gridGap: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        gridItemStyles() {
            const { column } = this.item;

            return {
                gridColumn: `${column + 1} / ${this.columns + 1}`,
                padding: `${this.gridGap}px 0`,
                gridTemplateColumns: `repeat(${this.columns - column}, 1fr)`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid__item-area {
        position: relative;
        display: grid;
        justify-content: flex-start;
        align-items: center;

        .item-area__line {
            position: absolute;
            z-index: $Z_INDEX_NEGATIVE;
            display: flex;
            width: 100%;
            grid-column: 1 / 1;
            border-left: $BORDER_2_GREEN;
            border-bottom: $BORDER_2_GREEN;
            transition: width 0.3s;
        }
    }

    .expand-enter-active, .expand-leave-active {
        transform-origin: top left;
    }

    .expand-enter-active {
        animation: bounce-in 0.4s;
    }

    .expand-leave-active {
        animation: bounce-in 0.4s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(1, 0);
        }

        100% {
            transform: scale(1);
        }
    }
</style>
