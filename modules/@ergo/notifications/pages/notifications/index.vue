/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar title="Notifications" />
        <HorizontalRoutingTabBar
            :items="tabs" />
    </Page>
</template>

<script>

export default {
    name: 'NotificationTabs',
    components: {
        HorizontalRoutingTabBar: () => import('@Core/components/TabBar/Routing/HorizontalRoutingTabBar'),
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
    },
    async fetch({ store }) {
        await store.dispatch('notifications/requestForNotifications');
    },
    computed: {
        tabs() {
            return [
                {
                    title: 'Notifications',
                    route: { name: 'notifications-grid' },
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
