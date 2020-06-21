/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        :class="['element-title', {
            'element-title--small': small
        }]"
        :title="hint"
        v-text="title" />
</template>

<script>
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
        hint: {
            type: [
                String,
                Number,
            ],
            default: '',
        },
        small: {
            type: Boolean,
            default: false,
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

        &:not(&--small) {
            font: $FONT_MEDIUM_14_20;
        }

        &--small {
            font: $FONT_MEDIUM_12_16;
        }
    }
</style>
