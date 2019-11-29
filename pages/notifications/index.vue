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
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        BasePage: () => import('~/core/components/Layout/BasePage'),
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
};
</script>
