/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('@Products._.addProducts.title')"
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

export default {
    name: 'AddProductsToGroupButton',
    components: {
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
