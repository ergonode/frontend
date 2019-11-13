/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            title="Users"
            icon="User"
            :is-read-only="$isReadOnly(titleBarData.isReadOnly)">
            <template
                v-if="titleBarData.button"
                #buttons>
                <PrependIconButton
                    :title="titleBarData.button.title"
                    :size="smallSize"
                    :disabled="!$hasAccess(titleBarData.button.access)"
                    @click.native="addNew(titleBarData.button.path)">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar
            :items="tabs" />
    </BasePage>
</template>

<script>
import { SIZES } from '~/defaults/buttons';
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';

export default {
    name: 'UsersTabs',
    middleware: ['tab/redirectToUsersGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        BasePage: () => import('~/components/Layout/BasePage'),
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
            });
        }
        if (this.$hasAccess('USER_ROLE_READ')) {
            this.tabs.push({
                title: 'Roles',
                route: { name: 'users-roles' },
                active: true,
            });
        }
        // TODO: BE need to decide if the new privilege is needed - fill the condition with correct equation
        this.tabs.push({
            title: 'Users activity logs',
            route: { name: 'users-activity-logs' },
            active: true,
        });
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        titleBarData() {
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
