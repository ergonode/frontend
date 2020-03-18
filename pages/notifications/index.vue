/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar title="Notifications" />
        <HorizontalTabBar
            :items="tabs" />
    </Page>
</template>

<script>

export default {
    name: 'NotificationTabs',
    components: {
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
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
    async fetch({ store }) {
        await store.dispatch('notifications/requestForNotifications');
    },
};
</script>
