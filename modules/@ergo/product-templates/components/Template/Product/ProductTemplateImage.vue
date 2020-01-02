/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadImage
        :value="value"
        :label="label"
        :required="required"
        :disabled="disabled"
        height="unset"
        @upload="onValueChange"
        @remove="onValueChange" />
</template>

<script>
import productTemplateElementMixin from '@Templates/mixins/productTemplateElementMixin';

export default {
    name: 'ProductTemplateImage',
    mixins: [productTemplateElementMixin],
    components: {
        UploadImage: () => import('@Core/components/Inputs/Image/UploadImage'),
    },
};
</script>
