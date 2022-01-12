/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        :title="$t('@ProductBatchActions.productBatchAction.components.ProductBatchActionDetailsModalGrid.title')"
        @close="onClose">
        <template #body>
            <ProductBatchActionDetailsGrid :item="item" />
        </template>
    </ModalGrid>
</template>

<script>
import ProductBatchActionDetailsGrid from '@ProductBatchActions/components/Grids/ProductBatchActionDetailsGrid';

export default {
    name: 'ProductBatchActionDetailsModalGrid',
    components: {
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
