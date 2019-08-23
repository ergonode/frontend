/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridUsersPage
        :title="title"
        :buttons="getButtons"
        icon="User" />
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'Users',
    middleware: ['tab/redirectToUsersGrid'],
    components: {
        GridUsersPage: () => import('~/components/Pages/GridUsersPage'),
    },
    data() {
        return {
            title: 'Users',
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
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
                        disabled: !this.$canIUse('USER_CREATE'),
                    },
                ];
            }

            return [
                {
                    title: 'CREATE ROLE',
                    color: 'success',
                    action: this.addNewRole,
                    disabled: !this.$canIUse('USER_ROLE_CREATE'),
                },
            ];
        },
    },
    methods: {
        addNewUser() {
            this.$router.push('/users/new');
        },
        addNewRole() {
            this.$router.push('/users/roles/new');
        },
    },
};
</script>
