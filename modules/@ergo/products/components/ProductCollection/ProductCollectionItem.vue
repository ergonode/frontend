/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="product-collection-item">
        <img
            class="product-collection-item__placeholder"
            :src="placeholderImage"
            alt="template icon">
        <span
            class="product-collection-item__title"
            v-text="item.sku" />
    </div>
</template>

<script>
export default {
    name: 'ProductCollectionItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        placeholderImage() {
            return require('@Core/assets/images/placeholders/template.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
    },
};
</script>

<style lang="scss" scoped>
    .product-collection-item {
        display: grid;
        grid-template-rows: 156px 32px;
        border: $BORDER_1_GREY;
        box-sizing: border-box;

        &__title {
            padding: 8px;
            box-sizing: border-box;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            border-top: $BORDER_1_GREY;
        }

        &__placeholder {
            justify-self: center;
            align-self: center;
        }
    }
</style>
