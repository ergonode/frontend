/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Carousel
        :current-index="currentIndex"
        :items="imageIds"
        @current="onCurrentIndexChange">
        <template #item="{ item }">
            <ImageCarouselImage
                :image-id="item"
                :href="href" />
        </template>
    </Carousel>
</template>

<script>
import ImageCarouselImage from '@UI/components/ImageCarousel/ImageCarouselImage';

export default {
    name: 'ImageCarousel',
    components: {
        ImageCarouselImage,
    },
    props: {
        /**
         * Index of presented image
         */
        currentIndex: {
            type: Number,
            default: 0,
        },
        /**
         * Unique identifiers of images
         */
        imageIds: {
            type: Array,
            default: () => [],
        },
        /**
         * URL of backend endpoint
         */
        href: {
            type: String,
            required: true,
        },
    },
    methods: {
        onCurrentIndexChange(index) {
            this.$emit('current', index);
        },
    },
};
</script>
