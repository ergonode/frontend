/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar title="Notifications" />
        <HorizontalRoutingTabBar :items="tabs" />
    </Page>
</template>

<script>
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import {
    ROUTE_NAME,
} from '@Notifications/config/routes';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';

export default {
    name: 'NotificationTabs',
    components: {
        HorizontalRoutingTabBar,
        TitleBar,
        Page,
    },
    mixins: [
        beforeRouteLeaveMixin,
    ],
    async fetch({
        store,
    }) {
        await store.dispatch('notification/requestForNotifications', {});
    },
    computed: {
        tabs() {
            return [
                {
                    title: 'Notifications',
                    route: {
                        name: ROUTE_NAME.NOTIFICATIONS_GRID,
                    },
                },
            ];
        },
    },
    head() {
        return {
            title: 'Notifications - Ergonode',
        };
    },
};
</script>
