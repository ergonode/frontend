/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="new-attribute-group"
        :title="$t('attributeGroup.page.addButton')"
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
import PRIVILEGES from '@Attributes/config/privileges';
import {
    SIZE,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';

export default {
    name: 'CreateAttributeGroupButton',
    components: {
        Button,
        IconAdd,
        CreateAttributeGroupModalForm: () => import('@Attributes/components/Modals/CreateAttributeGroupModalForm'),
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

            const event = new CustomEvent('attribute-group-created');

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
