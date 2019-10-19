/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridProductPage
        title="Products"
        :buttons="getButtons"
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
        getButtons() {
            const isGridPath = /grid/.test(this.$route.path);

            if (!isGridPath) return [];
            return [
                {
                    title: 'CREATE PRODUCT',
                    action: this.addNewProduct,
                    disabled: !this.$hasAccess('PRODUCT_CREATE'),
                    prepend: {
                        component: () => import('~/components/Icon/Actions/IconAdd'),
                    },
                },
            ];
        },
    },
    methods: {
        ...mapActions('list', {
            setConfigurationForList: 'setConfigurationForList',
        }),
        addNewProduct() {
            this.$router.push('/products/product/new');
        },
    },
    async fetch(parameters) {
        const { store } = parameters;
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        await store.dispatch('list/clearStorage');
        await store.dispatch('list/getGroups', {
            languageCode: userLanguageCode,
        });
    },
};
</script>
