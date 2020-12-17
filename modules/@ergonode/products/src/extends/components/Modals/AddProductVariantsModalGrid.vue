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
import ProductVariantsToAttachGrid from '@Products/extends/components/Grids/ProductVariantsToAttachGrid';
import ModalGrid from '@UI/components/Modal/ModalGrid';

export default {
    name: 'AddProductVariantsModalGrid',
    components: {
        ModalGrid,
        ProductVariantsToAttachGrid,
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
