/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ChannelPage
        :title="name"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    removeFromObjectByKey,
} from '@Core/models/objectWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditChannel',
    components: {
        ChannelPage: () => import('@Channels/components/Pages/ChannelPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('channels/getChannel', {
            id: params.id,
        });
    },
    computed: {
        ...mapState('channels', {
            type: state => state.type,
            configuration: state => state.configuration,
            scheduler: state => state.scheduler,
        }),
        name() {
            const {
                name,
            } = JSON.parse(this.configuration);

            return name;
        },
    },
    destroyed() {
        this.__clearStorage();
    },
    methods: {
        ...mapActions('channels', [
            '__clearStorage',
            'updateChannel',
            'updateScheduler',
            'removeChannel',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this channel?',
                confirmCallback: () => this.removeChannel({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
        onSave() {
            const tmp = JSON.parse(this.scheduler);

            this.removeValidationErrors();
            this.updateChannel({
                id: this.$route.params.id,
                data: {
                    type: this.type,
                    ...JSON.parse(this.configuration),
                },
                onSuccess: this.onUpdateChannelSuccess,
                onError: this.onError,
            });
            this.updateScheduler({
                data: removeFromObjectByKey(tmp, 'id'),
                onSuccess: this.onUpdateSchedulerSuccess,
                onError: this.onError,
            });
        },
        onUpdateSchedulerSuccess() {
            this.removeValidationErrors();
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Scheduler updated',
            });
        },
        onUpdateChannelSuccess() {
            this.removeValidationErrors();
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Channel updated',
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Channel removed',
            });
            this.$router.push({
                name: 'channel-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.name} - Channel - Ergonode`,
        };
    },
};
</script>
