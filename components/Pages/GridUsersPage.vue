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
    name: 'GridUsersPage',
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
            required: true,
        },
        icon: {
            type: String,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            tabs: [
                {
                    title: 'Users',
                    path: '/users/grid',
                    active: true,
                    isContextualMenu: false,
                },
                {
                    title: 'Roles',
                    path: '/users/roles',
                    active: true,
                    isContextualMenu: false,
                },
                {
                    title: 'Users activity logs',
                    path: '/users/logs',
                    active: true,
                    isContextualMenu: false,
                },
            ],
        };
    },
};
</script>
