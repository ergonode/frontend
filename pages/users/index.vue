/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridUsersPage
        :title="title"
        :buttons="buttons"
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
            buttons: [
                {
                    title: 'CREATE USER',
                    color: 'success',
                    action: this.addNewUser,
                },
            ],
        };
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
    },
    async fetch(parameters) {
        const { store } = parameters;
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        const gridPath = `${userLanguageCode}/accounts`;

        await store.dispatch('grid/clearStorage');
        await store.dispatch('grid/getData', { path: gridPath });
    },
};
</script>
