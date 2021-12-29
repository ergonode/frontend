/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Channels.channel.components.RemoveChannelButton.title')"
        :disabled="!isAllowedToDelete"
        @click.native="onRemove">
        <template #prepend="{ color }">
            <IconDelete :fill-color="color" />
        </template>
    </Button>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import {
    ROUTE_NAME,
} from '@Channels/config/routes';
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
    name: 'RemoveChannelButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.delete,
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
            'removeChannel',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Channels.channel.components.RemoveChannelButton.confirmTitle'),
                applyTitle: this.$t('@Channels._.deleteConfirm'),
                action: () => this.removeChannel({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Channels.channel.components.RemoveChannelButton.successMessage'),
            });
            this.$router.push({
                name: ROUTE_NAME.CHANNELS_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Channels.channel.components.RemoveChannelButton.errorMessage'),
            });
        },
    },
};
</script>
