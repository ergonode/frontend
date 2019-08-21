/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridUsersPage
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
        GridUsersPage: () => import('~/components/Pages/GridUsersPage'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
    },
    methods: {
        addNewUser() {
            this.$router.push('/users/new');
        },
        addNewRole() {
            this.$router.push('/users/roles/new');
        },
        getButtons() {
            const isRolePath = /roles/.test(this.$route.path);

            return [
                {
                    title: isRolePath ? 'CREATE ROLE' : 'CREATE USER',
                    color: 'success',
                    action: isRolePath ? this.addNewRole : this.addNewUser,
                    disabled: isRolePath ? !this.$canIUse('USER_ROLE_CREATE') : !this.$canIUse('USER_CREATE'),
                },
            ];
        },
    },
};
</script>
