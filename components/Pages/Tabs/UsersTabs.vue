/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :buttons="buttons"
            :icon="icon"
            :is-read-only="isReadOnly" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
export default {
    name: 'UsersTabs',
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
            required: true,
        },
        icon: {
            type: String,
            default: null,
        },
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess('USER_READ')) {
            this.tabs.push({
                title: 'Users',
                route: { name: 'users-grid' },
                active: true,
                isContextualMenu: false,
            });
        }
        if (this.$hasAccess('USER_ROLE_READ')) {
            this.tabs.push({
                title: 'Roles',
                route: { name: 'users-roles' },
                active: true,
                isContextualMenu: false,
            });
        }
        // TODO: BE need to decide if the new privilege is needed - fill the condition with correct equation
        this.tabs.push({
            title: 'Users activity logs',
            route: { name: 'users-activity-logs' },
            active: true,
            isContextualMenu: false,
        });
    },
    computed: {
        isReadOnly() {
            const isRolesPage = /roles/.test(this.$route.path);
            if (isRolesPage) {
                return this.$isReadOnly('USER_ROLE');
            }
            return this.$isReadOnly('USER');
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
