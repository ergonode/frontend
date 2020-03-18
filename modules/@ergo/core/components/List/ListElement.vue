/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="['element', {
            'element--small': small,
            'element--large': large,
            'element--selected': selected,
        }]">
        <slot :is-selected="selected" />
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
    },
};
</script>

<style lang="scss" scoped>
    .element {
        display: flex;
        box-sizing: border-box;
        cursor: pointer;

        &:not(&--small):not(&--large) {
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

        &:hover {
            background-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }
    }
</style>
