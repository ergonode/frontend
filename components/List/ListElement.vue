/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li :class="['element', {'element--small': small, 'element--large': large}]">
        <slot />
    </li>
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
            background-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
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
            padding: 8px 10px 8px 16px;
        }
    }
</style>
