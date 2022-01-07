/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('@Products.productExtend.components.AddBindingAttributesButton.title')"
        :size="smallSize"
        :disabled="!isAllowedToUpdate"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconAdd :fill-color="color" />
        </template>
        <AddBindingAttributesModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @submitted="onAddedData" />
    </Button>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';
import {
    ATTRIBUTE_BINDING_ADDED_EVENT_NAME,
} from '@Products/extends/defaults';

export default {
    name: 'AddBindingAttributesButton',
    components: {
        AddBindingAttributesModalForm: () => import('@Products/extends/components/Modals/AddBindingAttributesModalForm'),
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onAddedData() {
            this.onCloseModal();

            const event = new CustomEvent(ATTRIBUTE_BINDING_ADDED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
