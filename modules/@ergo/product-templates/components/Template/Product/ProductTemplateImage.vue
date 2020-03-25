/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadImageFile
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
import UploadImageFile from '@Core/components/Inputs/UploadFile/UploadImageFile';

export default {
    name: 'ProductTemplateImage',
    components: {
        UploadImageFile,
    },
    mixins: [productTemplateElementMixin],
};
</script>
