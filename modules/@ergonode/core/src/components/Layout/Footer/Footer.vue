/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <footer
        :class="[
            'footer',
            { 'space-between': spaceBetween },
            { 'flex-end': flexEnd },
            { 'flex-start': flexStart },
        ]">
        <slot />
    </footer>
</template>

<script>

export default {
    name: 'Footer',
    props: {
        spaceBetween: {
            type: Boolean,
            default: false,
        },
        flexEnd: {
            type: Boolean,
            default: false,
        },
        flexStart: {
            type: Boolean,
            default: false,
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
