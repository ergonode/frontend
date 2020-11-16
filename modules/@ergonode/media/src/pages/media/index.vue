/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Media"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <Button
                    title="UPLOAD FILES"
                    :size="smallSize"
                    :theme="secondaryTheme"
                    :disabled="!isAllowedToCreate"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconUploadFile :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs">
            <template #content>
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
        <ModalTabBar
            v-if="isModalVisible"
            title="Add resources"
            :items="modalTabs"
            @close="onCreatedData" />
    </Page>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import PRIVILEGES from '@Media/config/privileges';
import Button from '@UI/components/Button/Button';
import IconUploadFile from '@UI/components/Icons/Actions/IconUploadFile';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';

export default {
    name: 'Media',
    components: {
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        Button,
        IconUploadFile,
        ModalTabBar: () => import('@UI/components/Modal/ModalTabBar'),
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
        asyncTabsMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.MULTIMEDIA.namespace);
        },
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
    head() {
        return {
            title: 'Media - Ergonode',
        };
    },
};
</script>
