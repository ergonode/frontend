/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="product-collection-item">
        <LazyImage
            v-if="item.image"
            :href="`multimedia/${item.image}/download/default`"
            :value="item.image" />
        <img
            v-else
            class="product-collection-item__placeholder"
            :src="placeholderImage"
            alt="template icon">
        <span
            class="product-collection-item__title"
            :title="item.description"
            v-text="item.description" />
    </div>
</template>

<script>
export default {
    name: 'ProductCollectionItem',
    components: {
        LazyImage: () => import('@UI/components/LazyImage/LazyImage'),
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        placeholderImage() {
            return require('@UI/assets/images/placeholders/template.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
    },
};
</script>

<style lang="scss" scoped>
    .product-collection-item {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 188px;
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

        &__placeholder {
            justify-self: center;
            align-self: center;
            object-fit: none;
        }

        &__placeholder, & > .image {
            height: 156px;
        }
    }
</style>
