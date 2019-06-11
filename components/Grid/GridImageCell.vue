/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Picture
        v-if="value"
        class="image-cell"
        :image-id="value" />
</template>

<script>
export default {
    name: 'GridImageCell',
    components: {
        Picture: () => import('~/components/Inputs/Image/Picture'),
    },
    props: {
        value: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .image-cell {
        flex: 1;
        margin: 8px;
        max-width: 120px;
    }
</style>
