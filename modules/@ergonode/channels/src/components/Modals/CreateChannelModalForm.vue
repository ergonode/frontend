/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create channel"
        @close="onClose">
        <template #body>
            <ChannelForm />
        </template>
        <template #footer>
            <Button
                title="CREATE"
                :disabled="isRequestPending"
                @click.native="onCreate" />
            <Button
                title="CREATE & EDIT"
                :theme="secondaryTheme"
                :disabled="isRequestPending"
                @click.native="onCreatedAndEdit" />
        </template>
    </ModalForm>
</template>

<script>
import {
    MODAL_ACTION,
} from '@Core/defaults/modals';
import {
    THEME,
} from '@Core/defaults/theme';
import actionModalFormMixin from '@Core/mixins/modals/actionModalFormMixin';
import {
    mapActions,
} from 'vuex';

const createChannel = () => import('@Channels/services/createChannel.service');

export default {
    name: 'CreateChannelModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Button/Button'),
        ChannelForm: () => import('@Channels/components/Forms/ChannelForm'),
    },
    mixins: [
        actionModalFormMixin({
            action: MODAL_ACTION.CREATE,
            namespace: 'Channel',
            request: createChannel,
        }),
    ],
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('channels', [
            '__clearStorage',
        ]),
        onClose() {
            this.__clearStorage();
            this.$emit('close');
        },
        onCreate() {
            this.onActionRequest(() => {
                this.__clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onActionRequest((id) => {
                this.$router.push({
                    name: 'channel-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
