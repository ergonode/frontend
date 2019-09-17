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
                padding: `${this.gridGap}px`,
                gridTemplateColumns: `repeat(${this.columns - column}, 1fr)`,
                gridGap: `${this.gridGap}px`,
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
            z-index: -1;
            display: flex;
            width: 100%;
            grid-column: 1 / 1;
            border-left: 2px solid $primary;
            border-bottom: 2px solid $primary;
            transition: width 0.3s;

            &::before {
                position: absolute;
                bottom: -4px;
                right: 0;
                width: 7px;
                height: 6px;
                background-color: $primary;
                content: "";
            }
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
