/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        :title="$t('@ProductsBatchActions.productBatchAction.components.ProductBatchActionDetailsModalGrid.title')"
        @close="onClose">
        <template #body>
            <ProductBatchActionDetailsGrid :item="item" />
        </template>
    </ModalGrid>
</template>

<script>
import ProductBatchActionDetailsGrid from '@ProductsBatchActions/components/Grids/ProductBatchActionDetailsGrid';
import ModalGrid from '@UI/components/Modal/ModalGrid';

export default {
    name: 'ProductBatchActionDetailsModalGrid',
    components: {
        ModalGrid,
        ProductBatchActionDetailsGrid,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
