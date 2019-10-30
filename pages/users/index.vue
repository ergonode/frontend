/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            title="Users"
            icon="User"
            :is-read-only="$isReadOnly(getTitleBarData.isReadOnly)">
            <template
                v-if="getTitleBarData.button"
                #buttons>
                <PrependIconButton
                    :title="getTitleBarData.button.title"
                    size="small"
                    :disabled="!$hasAccess(getTitleBarData.button.access)"
                    @click.native="addNew(getTitleBarData.button.path)">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';

export default {
    name: 'UsersTabs',
    middleware: ['tab/redirectToUsersGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
        PrependIconButton,
        IconAdd,
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
        getTitleBarData() {
            switch (true) {
            case /grid/.test(this.$route.path):
                return {
                    button: {
                        title: 'CREATE USER',
                        access: 'USER_CREATE',
                        path: '/users/user/new',
                    },
                    isReadOnly: 'USER',
                };
            case /roles/.test(this.$route.path):
                return {
                    button: {
                        title: 'CREATE ROLE',
                        access: 'USER_ROLE_CREATE',
                        path: '/users/role/new',
                    },
                    isReadOnly: 'USER_ROLE',
                };
            case /logs/.test(this.$route.path):
                return {
                    isReadOnly: 'USER',
                };
            default:
                return null;
            }
        },
    },
    methods: {
        addNew(path) {
            this.$router.push(path);
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
