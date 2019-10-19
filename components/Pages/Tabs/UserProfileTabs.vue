/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :buttons="buttons"
            :icon="icon" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
export default {
    name: 'UserProfileTabs',
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        buttons: {
            type: Array,
            default: () => [],
        },
        icon: {
            type: String,
            default: null,
        },
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
