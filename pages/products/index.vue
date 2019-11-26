/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridProductPage
        title="Products"
        icon="Document" />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Products',
    middleware: ['tab/redirectToProductGrid'],
    components: {
        GridProductPage: () => import('~/components/Pages/GridProductPage'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
    },
    methods: {
        ...mapActions('list', {
            setConfigurationForList: 'setConfigurationForList',
        }),
    },
    async fetch(parameters) {
        const { store } = parameters;
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        await store.dispatch('list/clearStorage');
        await Promise.all([
            store.dispatch('list/getGroups', userLanguageCode),
            store.dispatch('list/getElementsForGroup', {
                listType: 'attributes',
                groupId: null,
                languageCode: userLanguageCode,
            }),
        ]);
    },
};
</script>
