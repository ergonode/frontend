/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        title="UPLOAD FILES"
        :size="smallSize"
        :theme="secondaryTheme"
        :disabled="!isAllowedToCreate"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconUploadFile :fill-color="color" />
        </template>
        <ModalTabBar
            v-if="isModalVisible"
            title="Add resources"
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
import Button from '@UI/components/Button/Button';
import IconUploadFile from '@UI/components/Icons/Actions/IconUploadFile';

export default {
    name: 'UploadResourcesButton',
    components: {
        Button,
        IconUploadFile,
        ModalTabBar: () => import('@UI/components/Modal/ModalTabBar'),
    },
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
                    title: 'Upload files',
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
