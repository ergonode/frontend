/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="upload-resource"
        :title="$t('@Media.media.components.UploadResourcesButton.title')"
        :size="smallSize"
        :theme="secondaryTheme"
        :disabled="!isAllowedToCreate"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconUploadFile :fill-color="color" />
        </template>
        <ModalTabBar
            v-if="isModalVisible"
            :title="$t('@Media.media.components.UploadResourcesButton.modalTitle')"
            :items="modalTabs"
            @close="onUploadedData" />
    </Button>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Media/config/privileges';
import {
    RESOURCES_UPLOADED_EVENT_NAME,
} from '@Media/defaults';

export default {
    name: 'UploadResourcesButton',
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        modalTabs() {
            return [
                {
                    title: this.$t('@Media.media.components.UploadResourcesButton.modalTabTitle'),
                    content: {
                        component: () => import('@Media/components/Tabs/UploadFileTab'),
                        listeners: {},
                    },
                },
            ];
        },
    },
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onUploadedData() {
            this.onCloseModal();

            const event = new CustomEvent(RESOURCES_UPLOADED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
