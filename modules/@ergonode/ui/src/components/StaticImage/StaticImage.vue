/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <img
        ref="img"
        :style="styles"
        :class="classes">
</template>

<script>

export default {
    name: 'StaticImage',
    props: {
        /**
         * Determines if the component is of fab style
         */
        fab: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines image objectFit property
         */
        objectFit: {
            type: String,
            default: 'cover',
        },
    },
    computed: {
        classes() {
            return [
                'image',
                {
                    'image--fab': this.fab,
                },
            ];
        },
        styles() {
            return {
                objectFit: this.objectFit,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .image {
        width: 100%;
        max-height: 100%;

        &--fab {
            height: 100%;
            border-radius: 50%;
        }
    }
</style>
