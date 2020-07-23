/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-image-presentation-cell">
        <Picture :value="value" />
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
    .grid-image-presentation-cell {
        display: flex;
        height: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
</style>
