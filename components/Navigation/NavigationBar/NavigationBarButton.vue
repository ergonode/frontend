/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['bar-button', {'bar-button--selected': isSelected}]">
        <slot />
    </div>
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
        padding: 0 24px;
        cursor: pointer;
        outline: 0;

        &:hover, &--selected {
            background-color: rgba($graphite, 0.5);
        }

        .title {
            @include setFont(semiBold, regular, medium, $white);
            margin-left: 8px;
        }

        .icon-wrapper {
            display: flex;
            margin-right: -8px;
        }
    }
</style>
