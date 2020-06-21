/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        @click.stop>
        <slot />
    </div>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'DropDownFooter',
    props: {
        spaceBetween: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
    },
    computed: {
        classes() {
            return [
                'drop-down-footer',
                `drop-down-footer--${this.size}`,
                {
                    'drop-down-footer--space-between': this.spaceBetween,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .dropdown-footer {
        display: flex;
        flex-shrink: 0;
        justify-content: flex-end;
        align-items: center;
        box-sizing: border-box;
        background-color: $WHITE;
        box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.12);

        &--space-between {
            justify-content: space-between;
        }

        &--small {
            flex-basis: 40px;
            padding: 0 8px;
        }

        &--regular {
            flex-basis: 48px;
            padding: 0 12px;
        }
    }
</style>
