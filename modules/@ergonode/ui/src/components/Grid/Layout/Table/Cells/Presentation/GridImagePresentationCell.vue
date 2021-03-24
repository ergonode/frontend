/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-image-presentation-cell">
        <!-- TODO: Change relation to `multimedia` href.
             INFO: Secure relationship does not break the application.
        -->
        <LazyImage
            v-if="value"
            :href="`multimedia/${value}/download/default`"
            :value="value" />
    </div>
</template>

<script>
import LazyImage from '@UI/components/LazyImage/LazyImage';

export default {
    name: 'GridImagePresentationCell',
    components: {
        LazyImage,
    },
    props: {
        /**
         * Component value
         */
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
