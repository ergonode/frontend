/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="carousel">
        <CarouselPageInformation
            :current-index="currentIndex"
            :items-number="items.length" />
        <CarouselItem
            v-for="(item, index) in items"
            :key="index"
            :visible="currentIndex === index">
            <slot
                name="item"
                :index="index"
                :item="item" />
        </CarouselItem>
        <slot />
        <CarouselPagination
            :current-index="currentIndex"
            :items-number="items.length"
            :floating="floatingPagination"
            @current="onCurrentIndexChange">
            <slot name="itemTitle" />
        </CarouselPagination>
    </div>
</template>

<script>
import CarouselItem from '@UI/components/Carousel/CarouselItem';
import CarouselPageInformation from '@UI/components/Carousel/CarouselPageInformation';
import CarouselPagination from '@UI/components/Carousel/CarouselPagination';

export default {
    name: 'Carousel',
    components: {
        CarouselItem,
        CarouselPagination,
        CarouselPageInformation,
    },
    props: {
        /**
         * Index of presented image
         */
        currentIndex: {
            type: Number,
            default: 0,
        },
        items: {
            type: Array,
            default: () => [],
        },
        floatingPagination: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onCurrentIndexChange(index) {
            this.$emit('current', index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .carousel {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
</style>
