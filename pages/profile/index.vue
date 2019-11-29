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
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        BasePage: () => import('~/core/components/Layout/BasePage'),
    },
    data() {
        return {
            tabs: [
                {
                    title: 'Activity log',
                    route: { name: 'profile-activity-log-grid' },
                },
                {
                    title: 'Privileges',
                    route: { name: 'profile-privileges-grid' },
                },
            ],
        };
    },
};
</script>
