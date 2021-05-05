/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="new-status"
        :title="$t('@Workflow.statusTransition.components.CreateProductStatusButton.title')"
        :size="smallSize"
        :disabled="!isAllowedToCreate"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconAdd :fill-color="color" />
        </template>
        <CreateProductStatusModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Button>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    PRODUCT_STATUS_CREATED_EVENT_NAME,
} from '@Workflow/defaults';

export default {
    name: 'CreateProductStatusButton',
    components: {
        Button,
        IconAdd,
        CreateProductStatusModalForm: () => import('@Workflow/components/Modals/CreateProductStatusModalForm'),
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.create,
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

            const event = new CustomEvent(PRODUCT_STATUS_CREATED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
