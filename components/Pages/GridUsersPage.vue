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
            default: null,
        },
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$canIUse('USER_READ')) {
            this.tabs.push({
                title: 'Users',
                path: '/users/grid',
                active: true,
                isContextualMenu: false,
            });
        }
        if (this.$canIUse('USER_ROLE_READ')) {
            this.tabs.push({
                title: 'Roles',
                path: '/users/roles',
                active: true,
                isContextualMenu: false,
            });
        }
        // TODO: BE need to decide if the new privilege is needed - fill the condition with correct equation
        if (true) {
            this.tabs.push({
                title: 'Users activity logs',
                path: '/users/logs',
                active: true,
                isContextualMenu: false,
            });
        }
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
