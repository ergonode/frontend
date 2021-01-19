/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Add products from list"
        @close="onClose">
        <template #body>
            <ProductVariantsToAttachGrid />
        </template>
    </ModalGrid>
</template>

<script>
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import ProductVariantsToAttachGrid from '@Products/extends/components/Grids/ProductVariantsToAttachGrid';
import ModalGrid from '@UI/components/Modal/ModalGrid';

export default {
    name: 'AddProductVariantsModalGrid',
    components: {
        ModalGrid,
        ProductVariantsToAttachGrid,
    },
    mixins: [
        scopeErrorsMixin,
    ],
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
