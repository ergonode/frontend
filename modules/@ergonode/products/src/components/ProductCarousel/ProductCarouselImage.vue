/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LazyImage
        v-if="product && product.esa_default_image"
        :href="href"
        :value="product.esa_default_image"
        object-fit="contain" />
    <DefaultImage v-else />
</template>

<script>

export default {
    name: 'ProductCarouselImage',
    props: {
        product: {
            type: Object,
            default: null,
        },
    },
    computed: {
        href() {
            return `multimedia/${this.product.esa_default_image}/download/default`;
        },
    },
};
</script>
