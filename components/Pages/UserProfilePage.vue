/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            :title="title"
            :buttons="buttons"
            :icon="icon" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
export default {
    name: 'UserProfile',
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        NavigationHeader: () => import('~/components/ReusableHeader/NavigationHeader'),
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
                    path: '/profile/activity-log',
                    active: true,
                    isContextualMenu: false,
                },
            ],
        };
    },
};
</script>
