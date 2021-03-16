/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
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
import Button from '@UI/components/Button/Button';
import IconDelete from '@UI/components/Icons/Actions/IconDelete';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveChannelButton',
    components: {
        Button,
        IconDelete,
    },
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
                title: 'Are you sure you want to delete this channel?',
                applyTitle: 'YES, REMOVE',
                action: () => this.removeChannel({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Channel removed',
            });
            this.$router.push({
                name: ROUTE_NAME.CHANNELS_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Channel hasn`t been deleted',
            });
        },
    },
};
</script>
