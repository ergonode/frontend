/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('@Import.import.components.CreateImportButton.title')"
        :size="smallSize"
        :theme="secondaryTheme"
        :disabled="!isAllowedToUpdate"
        @click.native="onShowModal">
        <UploadImportFileModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Button>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Import/config/privileges';
import {
    IMPORT_CREATED_EVENT_NAME,
} from '@Import/defaults';

export default {
    name: 'CreateImportButton',
    components: {
        UploadImportFileModalForm: () => import('@Import/components/Modals/UploadImportFileModalForm'),
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.IMPORT.update,
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

            const event = new CustomEvent(IMPORT_CREATED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
