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
        <div
            class="item-area__line"
            :style="setConnectionStyle" />
    </div>
</template>
<script>
import { mapState } from 'vuex';

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
        rowsHeight: {
            type: Number,
            required: true,
        },
        columnWidth: {
            type: Number,
            required: true,
        },
    },
    data: () => ({
        gridGap: 10,
    }),
    computed: {
        ...mapState('tree', {
            treeData: state => state.treeData,
        }),
        gridItemStyles() {
            const { column } = this.item;
            return {
                gridColumn: `${column + 1} / ${this.columns + 1}`,
                padding: `8px 0 8px ${this.gridGap}px`,
                gridTemplateColumns: `repeat(${this.columns - column}, 1fr)`,
                gridGap: `${this.gridGap}px`,
            };
        },
        setConnectionStyle() {
            const { id, row, parent } = this.item;
            const children = this.treeData.filter(e => e.parent === parent);
            const connectionHeight = this.rowsHeight * (row - children[0].row + 1);
            const connectionWidth = this.columnWidth - 21;
            const borderStyle = id === 'ghost_item' ? 'dashed' : 'solid';
            return {
                borderBottomStyle: borderStyle,
                borderLeftStyle: borderStyle,
                left: parent === 'root' ? '0' : `-${connectionWidth - this.gridGap}px`,
                width: parent === 'root' ? `${this.gridGap}px` : `${connectionWidth}px`,
                height: `${connectionHeight + (this.rowsHeight / 2) - this.gridGap}px`,
                bottom: `${this.rowsHeight / 2}px`,
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
