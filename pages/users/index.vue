/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UsersTabs
        title="Users"
        :buttons="getButtons()"
        icon="User" />
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'Users',
    middleware: ['tab/redirectToUsersGrid'],
    components: {
        UsersTabs: () => import('~/components/Pages/Tabs/UsersTabs'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
    },
    methods: {
        addNewUser() {
            this.$router.push('/users/user/new');
        },
        addNewRole() {
            this.$router.push('/users/role/new');
        },
        getButtons() {
            const isRolesPath = /roles/.test(this.$route.path);
            const isUsersPath = /grid/.test(this.$route.path);

            if (!isRolesPath && !isUsersPath) return [];

            if (isUsersPath) {
                return [
                    {
                        title: 'CREATE USER',
                        color: 'success',
                        action: this.addNewUser,
                        disabled: !this.$hasAccess('USER_CREATE'),
                    },
                ];
            }

            return [
                {
                    title: 'CREATE ROLE',
                    color: 'success',
                    action: this.addNewRole,
                    disabled: !this.$hasAccess('USER_ROLE_CREATE'),
                },
            ];
        },
    },
};
</script>
