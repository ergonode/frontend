/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridProductPage
        :title="title"
        :action-paths="actionPaths"
        :buttons="buttons"
        icon="sprite-menu menu-paper--selected" />
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
                getData: `${this.userLanguageCode}/products`,
                routerEdit: 'products-edit-id',
            };
        },
    },
    created() {
        this.setConfigurationForList({
            elementsAreMultiDraggable: false,
            isListMultilingual: true,
            draggedElementsStore: {
                storeName: 'grid',
                stateName: 'columns',
                idName: ['element_id'],
            },
        });
    },
    destroyed() {
        this.clearListStorage();
    },
    methods: {
        ...mapActions('list', {
            setConfigurationForList: 'setConfigurationForList',
            clearListStorage: 'clearStorage',
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
        const groupsRequest = store.dispatch('list/getGroups', {
            languageCode: userLanguageCode,
            onSuccess: () => {},
            onError: () => {},
        });
        const gridRequest = store.dispatch('grid/getData', { path: gridPath });

        await store.dispatch('grid/clearStorage');

        return Promise.all([
            gridRequest,
            groupsRequest,
        ]);
    },
};
</script>
