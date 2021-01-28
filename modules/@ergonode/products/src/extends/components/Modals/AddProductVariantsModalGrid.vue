/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Add products from list"
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
import ModalGrid from '@UI/components/Modal/ModalGrid';

export default {
    name: 'AddProductVariantsModalGrid',
    components: {
        ModalGrid,
        ProductVariantsToAttachGrid,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    methods: {
        onClose() {
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
    },
};
</script>
