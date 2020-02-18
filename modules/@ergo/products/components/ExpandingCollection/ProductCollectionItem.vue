/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="item">
        <img
            :src="placeholderImage"
            alt="template icon">
        <span class="item__title">Placeholder</span>
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
    .item {
        display: grid;
        grid-template-rows: 156px 32px;
        width: 210px;
        border: $BORDER_1_GREY;
        box-sizing: border-box;

        &__title {
            padding: 8px;
            box-sizing: border-box;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            border-top: $BORDER_1_GREY;
        }
    }
</style>
