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
        background-color: $GRAPHITE_COAL;
        cursor: pointer;
        outline: none;

        &:hover, &--selected {
            background-color: $GRAPHITE_DARK;
        }
    }
</style>
