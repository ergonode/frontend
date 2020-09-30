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
        <HorizontalRoutingTabBar :items="tabs">
            <template #content>
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
        <ModalTabBar
            v-if="isModalVisible"
            :items="modalTabs"
            @close="onCreatedData" />
    </Page>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconUploadFile from '@Core/components/Icons/Actions/IconUploadFile';
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';
import PRIVILEGES from '@Media/config/privileges';

export default {
    name: 'Media',
    components: {
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        Button,
        IconUploadFile,
        ModalTabBar: () => import('@Core/components/Modal/ModalTabBar'),
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
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
        tabs() {
            return getNestedTabRoutes({
                hasAccess: this.$hasAccess,
                routes: this.$router.options.routes,
                route: this.$route,
            });
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
