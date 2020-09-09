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
                    :disabled="!isUserAllowedToCreate"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
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
import {
    SIZE,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';

export default {
    name: 'Channels',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalRoutingTabBar: () => import('@Core/components/TabBar/Routing/HorizontalRoutingTabBar'),
        CreateChannelModalForm: () => import('@Channels/components/Modals/CreateChannelModalForm'),
        Button,
        IconAdd,
    },
    mixins: [
        gridModalMixin,
    ],
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        isUserAllowedToCreate() {
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
