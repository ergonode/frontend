/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            title="Profile"
            icon="User" />
        <HorizontalTabBar
            :items="tabs" />
    </BasePage>
</template>

<script>
export default {
    name: 'UserProfileTabs',
    middleware: ['tab/redirectToUserActivityLogGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        BasePage: () => import('~/components/Layout/BasePage'),
    },
    data() {
        return {
            tabs: [
                {
                    title: 'Activity log',
                    route: { name: 'profile-activity-log-grid' },
                    active: true,
                    isContextualMenu: false,
                },
            ],
        };
    },
};
</script>
