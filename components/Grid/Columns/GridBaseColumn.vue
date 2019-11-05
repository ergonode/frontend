/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['column', {
            'border-right': borderRight,
            'sticky': sticky,
        }]">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridBaseColumn',
    props: {
        borderRight: {
            type: Boolean,
            default: true,
        },
        sticky: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .column {
        position: relative;
        display: grid;
        box-sizing: border-box;

        &::before {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 2;
            width: 1px;
            height: 100%;
            background-color: $GREY;
            opacity: 0;
            content: "";
        }

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: $ELEVATOR_2_DP;
            opacity: 0;
            pointer-events: none;
            content: "";
        }

        &.hover {
            z-index: 999;

            &::after {
                opacity: 1;
            }
        }

        &.sticky {
            position: sticky;
            z-index: 3;
        }

        &.border-right {
            &::before {
                opacity: 1;
            }
        }

        &.drop-shadow-right-pinned {
            &::before {
                left: 0;
                right: unset;
                z-index: unset;
                background-color: unset;
                box-shadow: $ELEVATOR_2_DP;
                opacity: 1;
            }
        }

        &.drop-shadow-left-pinned {
            &::before {
                z-index: unset;
                background-color: unset;
                box-shadow: $ELEVATOR_2_DP;
                opacity: 1;
            }
        }
    }
</style>
