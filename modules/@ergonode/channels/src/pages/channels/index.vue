/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Channel"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <Button
                    title="NEW CHANNEL"
                    :size="smallSize"
                    :disabled="!isAllowedToCreate"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
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
        <CreateChannelModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Page>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';

export default {
    name: 'Channels',
    components: {
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        Button,
        IconAdd,
        CreateChannelModalForm: () => import('@Channels/components/Modals/CreateChannelModalForm'),
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
        asyncTabsMixin,
    ],
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.create,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CHANNEL.namespace);
        },
    },
    head() {
        return {
            title: 'Channels - Ergonode',
        };
    },
};
</script>
