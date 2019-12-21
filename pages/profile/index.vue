/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar title="Profile" />
        <HorizontalTabBar
            :items="tabs" />
    </Page>
</template>

<script>
export default {
    name: 'UserProfileTabs',
    components: {
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
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
