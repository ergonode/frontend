/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button :class="['bar-button', {'bar-button--selected': isSelected}]">
        <slot />
    </button>
</template>

<script>
export default {
    name: 'NavigationBarButton',
    props: {
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .bar-button {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        padding: 0 24px;
        background-color: transparent;
        cursor: pointer;
        outline: none;

        &:hover, &--selected {
            background-color: rgba($GRAPHITE, 0.5);
        }

        .title {
            color: $WHITE;
            font: $FONT_SEMI_BOLD_14_20;
            margin-left: 8px;
        }
    }
</style>
