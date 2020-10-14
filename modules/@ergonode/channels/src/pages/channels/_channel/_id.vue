/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ChannelPage
        :title="name"
        @remove="onRemove" />
</template>

<script>
import ChannelPage from '@Channels/components/Pages/ChannelPage';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditChannel',
    components: {
        ChannelPage,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('channel/getChannel', params);
    },
    computed: {
        ...mapState('channel', [
            'configuration',
        ]),
        name() {
            const {
                name,
            } = JSON.parse(this.configuration);

            return name;
        },
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('channel', [
            '__clearStorage',
            'removeChannel',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this channel?',
                confirmCallback: () => this.removeChannel({
                    onSuccess: this.onRemoveSuccess,
                }),
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
