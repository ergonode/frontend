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
    },
    computed: {
        gridItemStyles() {
            const { ghost, column } = this.item;
            return {
                gridColumn: `${column + 1} / ${this.columns + 1}`,
                padding: ghost ? '0 1px 1px' : '5px',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid__item-area {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
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
