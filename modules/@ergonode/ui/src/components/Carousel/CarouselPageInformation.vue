/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="carousel-pagination"
        v-text="title" />
</template>

<script>
export default {
    name: 'CarouselPageInformation',
    props: {
        currentIndex: {
            type: Number,
            default: 0,
        },
        itemsNumber: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        title() {
            return `${this.currentIndex + 1}/${this.itemsNumber}`;
        },
    },
};
</script>

<style lang="scss" scoped>
    .carousel-pagination {
        position: absolute;
        top: 4px;
        left: 4px;
        padding: 8px;
        background-color: $WHITE;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        border-radius: 999px;
    }
</style>
