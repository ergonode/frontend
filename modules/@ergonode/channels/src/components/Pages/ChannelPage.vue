/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="isReadOnly">
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
        <HorizontalRoutingTabBar :items="tabs" />
        <Footer flex-end>
            <Button
                title="SAVE CHANNEL"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
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
import categoryManagementPageMixin from '@Core/mixins/page/categoryManagementPageMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ChannelPage',
    mixins: [
        categoryManagementPageMixin,
    ],
    computed: {
        ...mapState('channels', {
            id: state => state.id,
        }),
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
        ...mapActions('channels', [
            'createExport',
        ]),
        onCreateExport() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to start export?',
                confirmCallback: () => this.createExport({
                    onSuccess: this.onExportSuccess,
                }),
            });
        },
        onExportSuccess({
            id,
        }) {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Start exporting',
            });
            this.$router.push({
                name: 'export-id-details',
                params: {
                    channel_id: this.id,
                    export_id: id,
                },
            });
        },
    },
};
</script>
