/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        :title="$t('@Collections._.addProducts.fromListOption')"
        @close="onClose">
        <template #body>
            <ProductsToAttachForCollectionGrid
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </ModalGrid>
</template>

<script>
import ProductsToAttachForCollectionGrid from '@Collections/components/Grids/ProductsToAttachForCollectionGrid';
import {
    PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
} from '@Collections/defaults';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';

export default {
    name: 'AddProductsFromListModalGrid',
    components: {
        ProductsToAttachForCollectionGrid,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    mounted() {
        document.documentElement.addEventListener(
            PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
            this.onProductsAttachmentUpdated,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
            this.onProductsAttachmentUpdated,
        );
    },
    methods: {
        onProductsAttachmentUpdated() {
            this.onClose();
            this.$emit('submitted');
        },
        onClose() {
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
    },
};
</script>
