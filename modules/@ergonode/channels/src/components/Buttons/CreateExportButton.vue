/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('@Channels.channel.components.CreateExportButton.title')"
        :size="smallSize"
        :theme="secondaryTheme"
        :disabled="!isAllowedToUpdate"
        @click.native="onCreateExport" />
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import {
    EXPORT_CREATED_EVENT_NAME,
} from '@Channels/defaults';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateExportButton',
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('channel', [
            'createChannelExport',
        ]),
        onCreateExport() {
            this.$confirm({
                type: MODAL_TYPE.POSITIVE,
                title: this.$t('@Channels.channel.components.CreateExportButton.confirmTitle'),
                action: () => this.createChannelExport({
                    onSuccess: this.onExportSuccess,
                }),
            });
        },
        onExportSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Channels.channel.components.CreateExportButton.successMessage'),
            });

            const event = new CustomEvent(EXPORT_CREATED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
