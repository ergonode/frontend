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
                <NavigationBackFab />
            </template>
            <template #mainAction>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE CHANNEL"
                    :disabled="!isAllowedToDelete"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
                <Button
                    title="EXPORT NOW"
                    :size="smallSize"
                    :theme="secondaryTheme"
                    :disabled="!isAllowedToUpdate"
                    @click.native="onCreateExport" />
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
import PRIVILEGES from '@Channels/config/privileges';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import editPageMixin from '@Core/mixins/page/editPageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import HorizontalRoutingTabBarContent from '@UI/components/TabBar/Routing/HorizontalRoutingTabBarContent';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ChannelPage',
    components: {
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
        ...mapState('channel', [
            'id',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.delete,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CHANNEL.namespace);
        },
    },
    methods: {
        ...mapActions('channel', [
            'createChannelExport',
        ]),
        onFetchedGridData() {
            this.fetchGridData = false;
        },
        onCreateExport() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to start export?',
                confirmCallback: () => this.createChannelExport({
                    onSuccess: this.onExportSuccess,
                }),
            });
        },
        onExportSuccess() {
            this.fetchGridData = true;
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Completed generating export file',
            });
        },
    },
};
</script>
