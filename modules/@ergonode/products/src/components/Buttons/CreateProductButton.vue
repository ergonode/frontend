/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        title="NEW PRODUCT"
        :size="smallSize"
        :disabled="!isAllowedToCreate"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconAdd :fill-color="color" />
        </template>
        <template #default>
            <CreateProductModalForm
                v-if="isModalVisible"
                @close="onCloseModal"
                @created="onCreatedData" />
        </template>
    </Button>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';

export default {
    name: 'CreateProductButton',
    components: {
        Button,
        IconAdd,
        CreateProductModalForm: () => import('@Products/components/Modals/CreateProductModalForm'),
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onCreatedData() {
            this.onCloseModal();
            this.$emit('created');
        },
    },
};
</script>
