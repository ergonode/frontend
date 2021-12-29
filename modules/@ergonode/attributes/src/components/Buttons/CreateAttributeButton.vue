/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="new-attribute"
        :title="$t('@Attributes.attribute.components.CreateAttributeButton.addButton')"
        :size="smallSize"
        :disabled="!isAllowedToCreate"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconAdd :fill-color="color" />
        </template>
        <CreateAttributeModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Button>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import {
    ATTRIBUTE_CREATED_EVENT_NAME,
} from '@Attributes/defaults';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'CreateAttributeButton',
    components: {
        CreateAttributeModalForm: () => import('@Attributes/components/Modals/CreateAttributeModalForm'),
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.create,
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

            const event = new CustomEvent(ATTRIBUTE_CREATED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
