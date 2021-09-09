/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="product-collection-item">
        <!-- TODO: Change relation to `multimedia` href.
             INFO: Secure relationship does not break the application.
        -->
        <LazyImage
            v-if="item.image"
            :href="`multimedia/${item.image}/download/default`"
            :value="item.image"
            :height="collectionImageHeight" />
        <DefaultImage v-else />
        <span
            class="product-collection-item__title"
            :title="item.description"
            v-text="item.description" />
    </div>
</template>

<script>
import {
    COLLECTION_IMAGE_HEIGHT,
} from '@Core/defaults/grid';
import DefaultImage from '@UI/components/DefaultImage/DefaultImage';
import LazyImage from '@UI/components/LazyImage/LazyImage';

export default {
    name: 'ProductCollectionItem',
    components: {
        DefaultImage,
        LazyImage,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        collectionImageHeight() {
            return COLLECTION_IMAGE_HEIGHT;
        },
    },
};
</script>

<style lang="scss" scoped>
    .product-collection-item {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 190px;
        border: $BORDER_1_GREY;
        box-sizing: border-box;
        text-align: left;
        white-space: nowrap;

        &__title {
            height: 32px;
            padding: 8px;
            box-sizing: border-box;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            border-top: $BORDER_1_GREY;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
</style>
