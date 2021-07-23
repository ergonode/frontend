/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
        <AddProductVariantsModalGrid
            v-if="isModalVisible"
            @close="onCloseModal" />
    </Button>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';

export default {
    name: 'AddProductVariantsButton',
    components: {
        AddProductVariantsModalGrid: () => import('@Products/extends/components/Modals/AddProductVariantsModalGrid'),
    },
    props: {
        title: {
            type: String,
            default: '',
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
    },
};
</script>
