/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="['element', {
            'element--search': search,
            'element--small': small,
            'element--large': large,
            'element--selected': selected,
        }]">
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
        selected: {
            type: Boolean,
            default: false,
        },
        search: {
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

        &:not(&--small):not(&--large):not(&--search) {
            height: 40px;
            padding: 0 8px;
        }

        &--small {
            height: 32px;
            padding: 0 4px;
        }

        &--large {
            height: 48px;
            padding: 0 8px;
        }

        &--selected {
            background-color: $GREEN_LIGHT;
        }

        &--search {
            padding: 0;
        }

        &:hover:not(&--search) {
            background-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }
    }
</style>
