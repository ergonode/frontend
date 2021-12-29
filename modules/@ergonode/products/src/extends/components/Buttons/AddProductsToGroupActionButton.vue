/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionButton
        :title="$t('@Products._.addProducts.title')"
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
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';
import ActionButton from '@UI/components/ActionButton/ActionButton';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';

export default {
    name: 'AddProductsToGroupActionButton',
    components: {
        IconAdd,
        ActionButton,
    },
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
            return this.$getExtendSlot('@Products/components/Tabs/ProductGroupTab/addProductFrom') || [];
        },
        modalComponents() {
            let modalComponents = [
                {
                    component: () => import('@Products/extends/components/Modals/AddProductsBySKUModalForm'),
                    name: this.$t('@Products._.addProducts.fromSkuOption'),
                },
                {
                    component: () => import('@Products/extends/components/Modals/AddProductsFromSegmentModalForm'),
                    name: this.$t('@Products._.addProducts.fromSegmentOption'),
                },
                {
                    component: () => import('@Products/extends/components/Modals/AddProductsToGroupModalGrid'),
                    name: this.$t('@Products._.addProducts.fromListOption'),
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
                PRIVILEGES.PRODUCT.update,
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
