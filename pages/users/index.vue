/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridPage
        :title="title"
        :action-paths="actionPaths"
        :buttons="buttons"
        icon="sprite-menu menu-user--selected" />
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'Users',
    components: {
        GridPage: () => import('~/components/Pages/GridPage'),
    },
    data() {
        return {
            title: 'Users',
            buttons: [
                {
                    title: 'CREATE USER',
                    color: 'success',
                    action: this.addNewUser,
                    icon: 'sprite-button button-add-light',
                },
            ],
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        actionPaths() {
            return {
                getData: `${this.userLanguageCode}/accounts`,
                routerEdit: 'users-edit-id',
            };
        },
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
