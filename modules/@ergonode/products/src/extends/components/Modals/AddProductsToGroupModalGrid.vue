/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Add products from list"
        @close="onClose">
        <template #body>
            <ProductsToAttachForGroupGrid />
        </template>
    </ModalGrid>
</template>

<script>
import ProductsToAttachForGroupGrid from '@Products/extends/components/Grids/ProductsToAttachForGroupGrid';
import ModalGrid from '@UI/components/Modal/ModalGrid';

export default {
    name: 'AddProductsToGroupModalGrid',
    components: {
        ModalGrid,
        ProductsToAttachForGroupGrid,
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
