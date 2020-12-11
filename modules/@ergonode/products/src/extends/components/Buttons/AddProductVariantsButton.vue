/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="title"
        :size="smallSize"
        :theme="theme"
        :disabled="!isAllowedToUpdate"
        @click.native="onShowModal">
        <template #prepend="{ color } ">
            <slot
                name="prepend"
                :color="color" />
        </template>
        <AddProductsFromListModalGrid
            v-if="isModalVisible"
            @close="onCloseModal"
            @submitted="onAddedData" />
    </Button>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';
import Button from '@UI/components/Button/Button';

export default {
    name: 'AddProductVariantsButton',
    components: {
        Button,
        AddProductsFromListModalGrid: () => import('@Products/extends/components/Modals/AddProductsFromListModalGrid'),
    },
    props: {
        title: {
            type: String,
            default: 'CHOOSE VARIANTS',
        },
        /**
         * The theme of the component
         */
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: value => Object.values(THEME).indexOf(value) !== -1,
        },
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
            this.$emit('added');
        },
    },
};
</script>
