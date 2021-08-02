/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LazyImage
        :href="mappedHref"
        :value="imageId"
        object-fit="contain" />
</template>

<script>

export default {
    name: 'ImageCarouselImage',
    props: {
        /**
         * Id of image
         */
        imageId: {
            type: String,
            default: '',
        },
        /**
         * URL of backend endpoint
         */
        href: {
            type: String,
            required: true,
        },
    },
    computed: {
        mappedHref() {
            const replacements = {
                '[[ID]]': this.imageId,
            };

            return this.href.replace(/\[\[\w+\]\]/g, key => replacements[key] || key);
        },
    },
};
</script>
