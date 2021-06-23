/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <LazyImage
            v-if="product && product.esa_default_image"
            :href="`multimedia/${product.esa_default_image}/download/default`"
            :value="product.esa_default_image"
            object-fit="contain" />
        <DefaultImage v-else />
    </div>
</template>

<script>
import DefaultImage from '@UI/components/DefaultImage/DefaultImage';
import LazyImage from '@UI/components/LazyImage/LazyImage';

export default {
    name: 'ProductCarouselImage',
    components: {
        DefaultImage,
        LazyImage,
    },
    props: {
        fetchingDataIndex: {
            type: Number,
            default: 0,
        },
        currentIndex: {
            type: Number,
            default: 0,
        },
        index: {
            type: Number,
            default: 0,
        },
        product: {
            type: Object,
            default: null,
        },
    },
    computed: {
        classes() {
            return [
                'product-carousel-image',
                {
                    'product-carousel-image--visible': this.currentIndex === this.index && this.fetchingDataIndex !== this.index,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .product-carousel-image {
        display: none;
        flex: 1 1 auto;
        justify-content: center;
        height: 0;

        &--visible {
            display: flex;
        }
    }
</style>
