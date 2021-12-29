/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <img
        class="default-image"
        :src="image"
        alt="default image">
</template>

<script>
export default {
    name: 'DefaultImage',
    computed: {
        image() {
            return require('@UI/assets/images/placeholders/template.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
    },
};
</script>

<style lang="scss" scoped>
    .default-image {
        object-fit: scale-down;
        max-height: 100%;
    }
</style>
