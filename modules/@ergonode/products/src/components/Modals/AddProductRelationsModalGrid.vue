/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        :title="$t('@Products.product.components.AddProductRelationsModalGrid.title')"
        @close="onClose">
        <template #body>
            <VerticalTabBar :items="verticalTabs">
                <RemoveFilterAndColumnDropZone :scope="scope" />
            </VerticalTabBar>
            <AddProductRelationsGrid
                :value="value"
                :advanced-filter-values="advancedFilterValues"
                :product-id="productId"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                @input="onValueChange"
                @change-filter="onFiltersChange"
                @remove-filter="onRemoveFilter"
                @remove-all-filters="onRemoveAllFilters" />
        </template>
    </ModalGrid>
</template>

<script>
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import AddProductRelationsGrid from '@Products/components/Grids/AddProductRelationsGrid';

export default {
    name: 'AddProductRelationsModalGrid',
    components: {
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
            advancedFilterValues: {},
            verticalTabs: [],
        };
    },
    mounted() {
        this.setVerticalTabs();
    },
    methods: {
        async setVerticalTabs() {
            const extendedVerticalTabs = await this.$getExtendMethod('@Products/components/Modals/AddProductRelationsModalGrid/verticalTabs', {
                $this: this,
            });

            this.verticalTabs = [].concat(...extendedVerticalTabs);
        },
        onRemoveFilter(id) {
            delete this.advancedFilterValues[id];

            this.setVerticalTabs();
        },
        onRemoveAllFilters() {
            this.advancedFilterValues = {};

            this.setVerticalTabs();
        },
        onFiltersChange(filters) {
            this.advancedFilterValues = filters;

            this.setVerticalTabs();
        },
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
