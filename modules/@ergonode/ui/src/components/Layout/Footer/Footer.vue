/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <footer
        :class="classes">
        <slot />
    </footer>
</template>

<script>

export default {
    name: 'Footer',
    props: {
        /**
         * Equal space between each component
         */
        spaceBetween: {
            type: Boolean,
            default: false,
        },
        /**
         * Float to the right side
         */
        flexEnd: {
            type: Boolean,
            default: false,
        },
        /**
         * FLoat to the left side
         */
        flexStart: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'footer',
                {
                    'space-between': this.spaceBetween,
                },
                {
                    'flex-end': this.flexEnd,
                },
                {
                    'flex-start': this.flexStart,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .footer {
        z-index: $Z_INDEX_LVL_3;
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;

        &.space-between {
            justify-content: space-between;
        }

        &.flex-end {
            justify-content: flex-end;
        }

        &.flex-start {
            justify-content: flex-start;
        }
    }
</style>
