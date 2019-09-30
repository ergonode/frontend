/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['element', {'element--small': small, 'element--large': large}]">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ListElement',
    props: {
        large: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .element {
        display: flex;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
            background-color: $background;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &:not(&--small):not(&--large) {
            height: 40px;
            padding: 8px;
        }

        &--small {
            height: 32px;
            padding: 0 8px;
        }

        &--large {
            height: 48px;
            padding: 8px 12px;
        }
    }
</style>
