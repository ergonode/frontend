/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        :title="$t('@Products.product.components.AddProductRelationsModalGrid.title')"
        @close="onClose">
        <template #body>
            <AddProductRelationsGrid
                :value="value"
                :product-id="productId"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                @input="onValueChange" />
        </template>
    </ModalGrid>
</template>

<script>
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import AddProductRelationsGrid from '@Products/components/Grids/AddProductRelationsGrid';
import ModalGrid from '@UI/components/Modal/ModalGrid';

export default {
    name: 'AddProductRelationsModalGrid',
    components: {
        ModalGrid,
        AddProductRelationsGrid,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        productId: {
            type: String,
            default: '',
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
