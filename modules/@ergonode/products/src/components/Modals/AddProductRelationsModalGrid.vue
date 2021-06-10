/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        :title="$t('@Products.product.components.AddProductRelationsModalGrid.title')"
        @close="onClose">
        <template #body>
            <VerticalTabBar :items="verticalTabs" />
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
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';

export default {
    name: 'AddProductRelationsModalGrid',
    components: {
        VerticalTabBar,
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
    data() {
        return {
            verticalTabs: [],
        };
    },
    async mounted() {
        const extendedVerticalTabs = await this.$getExtendMethod('@Products/components/Modals/AddProductRelationsModalGrid/verticalTabs', {
            $this: this,
        });

        this.verticalTabs = [].concat(...extendedVerticalTabs);
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);

            this.onClose();
        },
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
