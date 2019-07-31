/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridProductPage
        :title="title"
        :buttons="buttons"
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
    data() {
        return {
            title: 'Products',
            buttons: [
                {
                    title: 'CREATE PRODUCT',
                    color: 'success',
                    action: this.addNewProduct,
                },
            ],
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
    },
    created() {
        this.setConfigurationForList({
            draggedElementsStore: {
                storeName: 'grid',
                stateName: 'columns',
                idName: ['element_id'],
            },
        });
    },
    methods: {
        ...mapActions('list', {
            setConfigurationForList: 'setConfigurationForList',
        }),
        addNewProduct() {
            this.$router.push('/products/new');
        },
    },
    async fetch(parameters) {
        const { store } = parameters;
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;
        const gridPath = `${userLanguageCode}/products`;

        await store.dispatch('list/clearStorage');
        await store.dispatch('list/getGroups', {
            languageCode: userLanguageCode,
            onSuccess: () => {},
            onError: () => {},
        });

        await store.dispatch('grid/clearStorage');
        await store.dispatch('grid/getData', { path: gridPath });
    },
};
</script>
