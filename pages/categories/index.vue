/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridPage
        :title="title"
        :action-paths="actionPaths"
        :buttons="buttons"
        icon="sprite-menu menu-folder--selected" />
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'Categories',
    components: {
        GridPage: () => import('~/components/Pages/GridPage'),
    },
    data() {
        return {
            title: 'Categories',
            buttons: [
                {
                    title: 'CREATE CATEGORY',
                    color: 'success',
                    action: this.addNewCategory,
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
                getData: `${this.userLanguageCode}/categories`,
                routerEdit: 'categories-edit-id',
            };
        },
    },
    methods: {
        addNewCategory() {
            this.$router.push('/categories/new');
        },
    },
    async fetch(parameters) {
        const { store } = parameters;
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        const gridPath = `${userLanguageCode}/categories`;

        return store.dispatch('grid/getData', { path: gridPath });
    },
};
</script>
