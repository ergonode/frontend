/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            title="Profile"
            icon="User" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
export default {
    name: 'UserProfileTabs',
    middleware: ['tab/redirectToUserActivityLogGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
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
