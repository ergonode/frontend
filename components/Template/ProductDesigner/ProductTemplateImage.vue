/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadImage
        :value="value"
        @upload="updateValue"
        @remove="updateValue" />
</template>

<script>
import { mapActions } from 'vuex';
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';

export default {
    name: 'ProductTemplateImage',
    components: {
        UploadImage: () => import('~/components/Inputs/Image/UploadImage'),
    },
    mixins: [baseProductTemplateElementMixin],
    methods: {
        ...mapActions('productsDraft', [
            'setProductTemplateElementValue',
        ]),
        updateValue(value = '') {
            this.setProductTemplateElementValue({
                value,
                attributeId: this.attributeId,
                required: this.required,
                name: this.name,
                onSuccess: this.onSuccess,
                onError: this.onError,
            });
        },
    },
};
</script>
