/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="new-attribute-group"
        :title="$t('@AttributeGroups.attributeGroup.components.CreateAttributeGroupButton.addButton')"
        :size="smallSize"
        :disabled="!isAllowedToCreate"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconAdd :fill-color="color" />
        </template>
        <CreateAttributeGroupModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Button>
</template>

<script>
import PRIVILEGES from '@AttributeGroups/config/privileges';
import {
    ATTRIBUTE_GROUP_CREATED_EVENT_NAME,
} from '@AttributeGroups/defaults';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'CreateAttributeGroupButton',
    components: {
        CreateAttributeGroupModalForm: () => import('@AttributeGroups/components/Modals/CreateAttributeGroupModalForm'),
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE_GROUP.create,
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

            const event = new CustomEvent(ATTRIBUTE_GROUP_CREATED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
