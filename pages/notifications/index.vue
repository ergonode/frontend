/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            title="Notifications"
            icon="Bell" />
        <HorizontalTabBar
            :items="tabs" />
    </BasePage>
</template>

<script>

export default {
    name: 'NotificationTabs',
    middleware: ['tab/redirectToNotificationGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        BasePage: () => import('~/components/Layout/BasePage'),
    },
    computed: {
        tabs() {
            return [
                {
                    title: 'Notifications',
                    route: { name: 'notifications-grid' },
                    active: true,
                },
            ];
        },
    },
};
</script>
