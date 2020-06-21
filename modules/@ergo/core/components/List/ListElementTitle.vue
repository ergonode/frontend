/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        :class="classes"
        :title="hint"
        v-text="title" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'ListElementTitle',
    props: {
        title: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        hint: {
            type: [
                String,
                Number,
            ],
            default: '',
        },
    },
    computed: {
        classes() {
            return [
                'list-element-title',
                `list-element-title--${this.size}`,
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-title {
        width: 100%;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &--small {
            font: $FONT_MEDIUM_12_16;
        }

        &--regular {
            font: $FONT_MEDIUM_14_20;
        }
    }
</style>
