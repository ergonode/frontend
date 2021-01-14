/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
            v-if="selectedModal"
            :is="modalComponent"
            @close="onCloseModal" />
    </ActionButton>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';
import {
    ADD_PRODUCT,
} from '@Products/defaults';
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
            const options = Object.values(ADD_PRODUCT);

            if (this.extendedComponents.length) {
                this.extendedComponents.forEach((option) => {
                    options.push(option.name);
                });
            }

            return options;
        },
        extendedComponents() {
            return this.$getExtendSlot('@Products/components/Tabs/ProductGroupTab/addProductFrom') || [];
        },
        modalComponent() {
            let extendedOptions = [];

            if (this.extendedComponents.length) {
                extendedOptions = this.extendedComponents;
            }
            const modals = [
                {
                    component: () => import('@Products/extends/components/Modals/AddProductsToGroupModalGrid'),
                    name: ADD_PRODUCT.FROM_LIST,
                },
                {
                    component: () => import('@Products/extends/components/Modals/AddProductsFromSegmentModalForm'),
                    name: ADD_PRODUCT.FROM_SEGMENT,
                },
                ...extendedOptions,
            ];

            return modals.find(modal => modal.name === this.selectedModal).component;
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
    },
};
</script>
