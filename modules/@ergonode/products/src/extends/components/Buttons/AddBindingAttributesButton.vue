/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        title="ADD BINDING ATTRIBUTES"
        :size="smallSize"
        :disabled="!isAllowedToUpdate"
        @click.native="onShowModal">
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
import Button from '@UI/components/Button/Button';

export default {
    name: 'AddBindingAttributesButton',
    components: {
        Button,
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

            const event = new CustomEvent('attribute-binding-added');

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
