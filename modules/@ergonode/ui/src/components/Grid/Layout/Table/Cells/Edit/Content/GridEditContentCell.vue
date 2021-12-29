/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        :class="classes">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridEditContentCell',
    props: {
        shadow: {
            type: Boolean,
            default: false,
        },
        centered: {
            type: Boolean,
            default: false,
        },
        bounds: {
            type: Object,
            required: true,
        },
        fixedHeight: {
            type: Number,
            default: 0,
        },
        fixedWidth: {
            type: Number,
            default: 0,
        },
        padding: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        styles() {
            const {
                x,
                y,
                width,
                height,
            } = this.bounds;
            const bottomOffset = this.centered ? 16 : 8;
            const actualHeight = this.fixedHeight || height;
            const actualWidth = (this.fixedWidth || width) + this.padding;
            const yPos = Math.min(window.innerHeight - actualHeight - bottomOffset, y);

            return {
                top: `${yPos}px`,
                left: `${x}px`,
                width: `${actualWidth}px`,
                minHeight: `${height + this.padding}px`,
            };
        },
        classes() {
            return [
                'grid-edit-content-cell',
                {
                    'grid-edit-content-cell--shadow': this.shadow,
                    'grid-edit-content-cell--centered': this.centered,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-edit-content-cell {
        position: fixed;
        z-index: $Z_INDEX_LVL_7;
        background-color: $WHITE;

        &--shadow {
            box-shadow: $ELEVATOR_6_DP;
        }

        &--centered {
            padding: 8px;
            transform: translate(-4px, -4px);
            box-sizing: border-box;
        }
    }
</style>
