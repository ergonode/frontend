/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="image-cell">
        <Picture
            v-if="value"
            :image-id="value" />
    </div>
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
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .image-cell {
        flex: 1;
        height: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
</style>
