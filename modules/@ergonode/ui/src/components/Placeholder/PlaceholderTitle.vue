/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        :class="classes"
        v-text="title" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'PlaceholderTitle',
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
                SIZE.LARGE,
            ].indexOf(value) !== -1,
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: 'Nothing to see here',
        },
    },
    computed: {
        classes() {
            return [
                'placeholder-title',
                `placeholder-title--${this.size}`,
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .placeholder-title {
        color: $GRAPHITE_DARK;

        &--small {
            font: $FONT_SEMI_BOLD_20_24;
        }

        &--regular, &--large {
            font: $FONT_SEMI_BOLD_24_32;
        }
    }
</style>
