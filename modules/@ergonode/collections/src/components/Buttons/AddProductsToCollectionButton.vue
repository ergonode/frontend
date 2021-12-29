/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionButton
        :title="$t('@Collections.collection.components.AddProductsToCollectionButton.title')"
        :theme="secondaryTheme"
        :disabled="!isAllowedToUpdate"
        :size="smallSize"
        :options="addProductOptions"
        :fixed-content="true"
        @input="onSelectAddProductOption">
        <template #prepend="{ color }">
            <IconAdd :fill-color="color" />
        </template>
        <Component
            v-if="selectedModal"
            :is="selectedModalComponent"
            @close="onCloseModal"
            @submitted="onCreatedData" />
    </ActionButton>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'AddProductsToCollectionButton',
    data() {
        return {
            selectedModal: null,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        addProductOptions() {
            return this.modalComponents.map(component => component.name);
        },
        extendedComponents() {
            return this.$getExtendSlot('@Collections/components/Tabs/CollectionProductsTab/addProductFrom');
        },
        modalComponents() {
            let modalComponents = [
                {
                    component: () => import('@Collections/components/Modals/AddProductsFromListModalGrid'),
                    name: this.$t('@Collections._.addProducts.fromListOption'),
                },
                {
                    component: () => import('@Collections/components/Modals/AddProductsBySKUModalForm'),
                    name: this.$t('@Collections._.addProducts.fromSkuOption'),
                },
                {
                    component: () => import('@Collections/components/Modals/AddProductsFromSegmentModalForm'),
                    name: this.$t('@Collections._.addProducts.fromSegmentOption'),
                },
            ];

            if (this.extendedComponents.length) {
                modalComponents = [
                    ...modalComponents,
                    ...this.extendedComponents,
                ];
            }

            return modalComponents;
        },
        selectedModalComponent() {
            return this.modalComponents.find(modal => modal.name === this.selectedModal).component;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
    },
    methods: {
        onSelectAddProductOption(option) {
            this.selectedModal = option;
        },
        onCloseModal() {
            this.selectedModal = null;
        },
        onCreatedData() {
            this.selectedModal = null;

            this.$emit('added');
        },
    },
};
</script>
