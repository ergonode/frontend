/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="new-unit"
        :title="$t('@Core.core.components.CreateUnitButton.title')"
        :theme="secondaryTheme"
        :disabled="!isAllowedToCreate"
        :size="smallSize"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconAdd :fill-color="color" />
        </template>
        <CreateUnitModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Button>
</template>

<script>
import PRIVILEGES from '@Core/config/privileges';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'CreateUnitButton',
    components: {
        CreateUnitModalForm: () => import('@Core/components/Modals/CreateUnitModalForm'),
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
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
