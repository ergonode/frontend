/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="image-cell">
        <Picture :image-id="value" />
    </div>
</template>

<script>
export default {
    name: 'GridImagePresentationCell',
    components: {
        Picture: () => import('@Core/components/Multimedia/Picture'),
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
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
</style>
