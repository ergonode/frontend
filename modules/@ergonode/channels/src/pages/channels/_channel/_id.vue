/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ChannelPage :title="name" />
</template>

<script>
import ChannelPage from '@Channels/components/Pages/ChannelPage';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
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
        app,
        store,
        params,
    }) {
        await store.dispatch('channel/getChannel', {
            id: params.id,
            onError: () => {
                if (process.client) {
                    app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: 'Channel hasn`t been fetched properly',
                    });
                }
            },
        });
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
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
    },
    head() {
        return {
            title: `${this.name} - Channel - Ergonode`,
        };
    },
};
</script>
