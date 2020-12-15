/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="name"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab :previous-route="previousRoute" />
            </template>
            <template #mainAction>
                <RemoveChannelButton />
                <CreateExportButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors" />
    </Page>
</template>

<script>
import CreateExportButton from '@Channels/components/Buttons/CreateExportButton';
import RemoveChannelButton from '@Channels/components/Buttons/RemoveChannelButton';
import PRIVILEGES from '@Channels/config/privileges';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeRouteEnterMixin from '@Core/mixins/route/beforeRouteEnterMixin';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditChannel',
    components: {
        Page,
        TitleBar,
        HorizontalRoutingTabBar,
        CreateExportButton,
        RemoveChannelButton,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
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
        await store.dispatch('dictionaries/getInitialDictionaries', {
            keys: [
                'channels',
            ],
        });
        await store.dispatch('channel/getChannel', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Channel hasn`t been fetched properly',
                });
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
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CHANNEL.namespace);
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
