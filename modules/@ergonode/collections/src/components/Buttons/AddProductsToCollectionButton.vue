/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionButton
        title="ADD PRODUCTS"
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
            v-if="selectedAppModalOption"
            :is="modalComponent"
            @close="onCloseModal"
            @submitted="onCreatedData" />
    </ActionButton>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import {
    ADD_PRODUCT,
} from '@Collections/defaults';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import ActionButton from '@UI/components/ActionButton/ActionButton';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';

export default {
    name: 'AddProductsToCollectionButton',
    components: {
        ActionButton,
        IconAdd,
    },
    data() {
        return {
            selectedAppModalOption: null,
        };
    },
    computed: {
        addProductOptions() {
            const options = Object.values(ADD_PRODUCT);

            if (this.extendedComponents.length) {
                this.extendedComponents.forEach((option) => {
                    options.push(option.name);
                });
            }

            return options;
        },
        extendedComponents() {
            return this.$getExtendSlot('@Collections/components/Tabs/CollectionProductsTab/addProductFrom');
        },
        modalComponent() {
            let extendedOptions = [];

            if (this.extendedComponents.length) {
                extendedOptions = this.extendedComponents;
            }

            const modals = [
                {
                    component: () => import('@Collections/components/Modals/AddProductsBySKUModalForm'),
                    name: ADD_PRODUCT.FROM_SKU,
                },
                {
                    component: () => import('@Collections/components/Modals/AddProductsFromSegmentModalForm'),
                    name: ADD_PRODUCT.FROM_SEGMENT,
                },
                ...extendedOptions,
            ];

            return modals.find(modal => modal.name === this.selectedAppModalOption).component;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
    },
    methods: {
        onSelectAddProductOption(option) {
            this.selectedAppModalOption = option;
        },
        onCloseModal() {
            this.selectedAppModalOption = null;
        },
        onCreatedData() {
            this.selectedAppModalOption = null;

            this.$emit('added');
        },
    },
};
</script>
