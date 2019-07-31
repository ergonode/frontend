/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridPage
        :title="title"
        :action-paths="actionPaths"
        :buttons="buttons"
        icon="Import" />
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Imports',
    components: {
        GridPage: () => import('~/components/Pages/GridPage'),
    },
    data() {
        return {
            title: 'Imports',
            buttons: [
                {
                    title: 'CREATE IMPORT',
                    color: 'success',
                    action: this.addNewImport,
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
                getData: 'imports/',
                routerEdit: 'imports-edit-id',
            };
        },
    },
    methods: {
        addNewImport() {
            // TODO: Imports will have add / edit
            // this.$router.push('/imports/new');
        },
    },
    async fetch(parameters) {
        const { store } = parameters;
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        const gridPath = `${userLanguageCode}/imports`;

        await store.dispatch('grid/clearStorage');
        await store.dispatch('grid/getData', { path: gridPath });
    },
};
</script>
