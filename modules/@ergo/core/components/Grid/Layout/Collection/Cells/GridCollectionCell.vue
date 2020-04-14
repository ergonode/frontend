/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="collection-cell">
        <Picture
            v-if="image"
            :image-id="image" />
        <img
            v-else
            class="collection-cell__placeholder"
            :src="placeholderImage"
            alt="template icon">
        <span
            class="collection-cell__title"
            v-text="item.description" />
    </div>
</template>

<script>
export default {
    name: 'GridCollectionCell',
    props: {
        image: {
            type: String,
            default: '',
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
    .collection-cell {
        display: flex;
        flex-direction: column;

        &__placeholder {
            justify-self: center;
            align-self: center;
        }

        &__title {
            height: 32px;
            padding: 8px;
            box-sizing: border-box;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            border-top: $BORDER_1_GREY;
        }
    }
</style>
