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
                    :disabled="!isUserAllowedToDelete"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
                <Button
                    title="EXPORT NOW"
                    :size="smallSize"
                    :theme="secondaryTheme"
                    :disabled="!isUserAllowedToUpdate"
                    @click.native="onCreateExport" />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            :items="tabs"
            :errors="errors">
            <template #content>
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
    </Page>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import HorizontalRoutingTabBarContent from '@Core/components/TabBar/Routing/HorizontalRoutingTabBarContent';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import editPageMixin from '@Core/mixins/page/editPageMixin';
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
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        isUserAllowedToDelete() {
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
            'createExport',
        ]),
        onFetchedGridData() {
            this.fetchGridData = false;
        },
        onCreateExport() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to start export?',
                confirmCallback: () => this.createExport({
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
