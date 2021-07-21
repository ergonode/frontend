/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        :title="$t('@Products._.addProducts.fromListTitle')"
        @close="onClose">
        <template #body>
            <ProductVariantsToAttachGrid
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </ModalGrid>
</template>

<script>
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import ProductVariantsToAttachGrid from '@Products/extends/components/Grids/ProductVariantsToAttachGrid';
import {
    PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
} from '@Products/extends/defaults';

export default {
    name: 'AddProductVariantsModalGrid',
    components: {
        ProductVariantsToAttachGrid,
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
        },
        onClose() {
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
    },
};
</script>
