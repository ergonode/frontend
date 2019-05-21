/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridPage
        :title="title"
        :action-paths="actionPaths"
        :buttons="buttons"
        icon="sprite-menu menu-puzzel--selected" />
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'Attributes',
    components: {
        GridPage: () => import('~/components/Pages/GridPage'),
    },
    data() {
        return {
            title: 'Attributes',
            buttons: [
                {
                    title: 'CREATE ATTRIBUTE',
                    color: 'success',
                    action: this.addNewAttribute,
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
                getData: `${this.userLanguageCode}/attributes`,
                routerEdit: 'attributes-edit-id',
            };
        },
    },
    methods: {
        addNewAttribute() {
            this.$router.push('/attributes/new');
        },
    },
    async fetch(parameters) {
        const { store } = parameters;
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        const gridPath = `${userLanguageCode}/attributes`;

        await store.dispatch('grid/clearStorage');

        return store.dispatch('grid/getData', { path: gridPath });
    },
};
</script>
