/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        title="ADD PRODUCTS"
        :disabled="!isAllowedToUpdate"
        :size="smallSize"
        @click.native="onShowModal">
        <AddProductsToGroupModalGrid
            v-if="isModalVisible"
            @close="onCloseModal" />
    </Button>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';
import Button from '@UI/components/Button/Button';

export default {
    name: 'AddProductsToGroupButton',
    components: {
        Button,
        AddProductsToGroupModalGrid: () => import('@Products/extends/components/Modals/AddProductsToGroupModalGrid'),
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
    },
};
</script>
