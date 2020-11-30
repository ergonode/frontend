/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab />
            </template>
            <template #mainAction>
                <RemoveChannelButton />
                <CreateExportButton @created="onCreatedData" />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors">
            <template
                #content="{
                    item,
                    errors: tabErrors,
                    changeValues: tabChangeValues,
                }">
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    :scope="item.scope"
                    :change-values="tabChangeValues"
                    :errors="tabErrors"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
    </Page>
</template>

<script>
import CreateExportButton from '@Channels/components/Buttons/CreateExportButton';
import RemoveChannelButton from '@Channels/components/Buttons/RemoveChannelButton';
import PRIVILEGES from '@Channels/config/privileges';
import editPageMixin from '@Core/mixins/page/editPageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import HorizontalRoutingTabBarContent from '@UI/components/TabBar/Routing/HorizontalRoutingTabBarContent';

export default {
    name: 'ChannelPage',
    components: {
        CreateExportButton,
        RemoveChannelButton,
        HorizontalRoutingTabBarContent,
    },
    mixins: [
        editPageMixin,
        asyncTabsMixin,
    ],
    data() {
        return {
            fetchGridData: false,
        };
    },
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CHANNEL.namespace);
        },
    },
    methods: {
        onFetchedGridData() {
            this.fetchGridData = false;
        },
        onCreatedData() {
            this.fetchGridData = true;
        },
    },
};
</script>
