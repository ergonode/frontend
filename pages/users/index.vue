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
