/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li :class="classes">
        <slot />
    </li>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'ListElement',
    props: {
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => Object.values(SIZE).indexOf(value) !== -1,
        },
        /**
         * Determinate if the component is selected
         */
        selected: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'list-element',
                `list-element--${this.size}`,
                {
                    'list-element--selected': this.selected,
                    'list-element--disabled': this.disabled,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-element {
        display: flex;
        cursor: pointer;

        &--regular {
            min-height: 40px;
            padding: 0 8px;
        }

        &--small {
            min-height: 32px;
            padding: 0 4px;
        }

        &--large {
            min-height: 48px;
            padding: 0 8px;
        }

        &--selected {
            background-color: $GREEN_LIGHT;
        }

        &--disabled {
            color: $GRAPHITE_LIGHT;
            cursor: not-allowed;
        }

        &:not(&--disabled):hover {
            background-color: $WHITESMOKE;
        }
    }
</style>
