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
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
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
