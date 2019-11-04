/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadImage
        :value="value"
        :disabled="disabled"
        :fixed-height="false"
        @upload="onValueChange"
        @remove="onValueChange" />
</template>

<script>
import productTemplateElementMixin from '~/mixins/product/productTemplateElementMixin';

export default {
    name: 'ProductTemplateImage',
    mixins: [productTemplateElementMixin],
    components: {
        UploadImage: () => import('~/components/Inputs/Image/UploadImage'),
    },
};
</script>
