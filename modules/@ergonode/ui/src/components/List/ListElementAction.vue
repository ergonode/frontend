/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'ListElementAction',
    props: {
        /**
         * The size of the component
         */
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
                'list-element-action',
                `list-element-action--${this.size}`,
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-element-action {
        display: flex;
        justify-content: center;
        align-items: center;

        &--small {
            margin: 0;
        }

        &--regular {
            margin: 0 4px;
        }
    }
</style>
