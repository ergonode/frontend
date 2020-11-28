/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        title="EXPORT NOW"
        :size="smallSize"
        :theme="secondaryTheme"
        :disabled="!isAllowedToUpdate"
        @click.native="onCreateExport">
        <template #prepend="{ color }">
            <IconAdd :fill-color="color" />
        </template>
    </Button>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
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
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateExportButton',
    components: {
        Button,
        IconAdd,
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
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
                title: 'Are you sure you want to start export?',
                action: () => this.createChannelExport({
                    onSuccess: this.onExportSuccess,
                }),
            });
        },
        onExportSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Export has been finished',
            });

            this.$emit('created');
        },
    },
};
</script>
