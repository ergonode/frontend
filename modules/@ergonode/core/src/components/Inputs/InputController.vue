/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot />
        <div class="input-controller__append">
            <slot name="append" />
        </div>
    </div>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'InputController',
    props: {
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
                'input-controller',
                `input-controller--${this.size}`,
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .input-controller {
        $controller: &;

        position: relative;
        z-index: $Z_INDEX_LVL_2;
        display: flex;
        flex: 1;
        align-items: center;

        &--small {
            #{$controller}__append {
                margin-left: 4px;
            }
        }

        &--regular {
            #{$controller}__append {
                margin-left: 6px;
            }
        }

        &__append {
            display: flex;
            align-items: center;
        }
    }
</style>
