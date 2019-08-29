/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductPage
        :title="sku"
        is-edit
        @dismiss="onDismiss"
        @save="onSave" />
</template>

<script>

import { mapState, mapActions } from 'vuex';
import { getMappedCategoryID } from '~/model/mappers/categoryMapper';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'Settings',
    middleware: ['tab/redirectToProductGeneral'],
    components: {
        ProductPage: () => import('~/components/Pages/ProductPage'),
    },
    computed: {
        ...mapState('productsDraft', {
            id: state => state.id,
            sku: state => state.sku,
            selectedCategories: state => state.selectedCategories,
            categories: state => state.categories,
        }),
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('productsDraft', [
            'updateProduct',
            'applyDraft',
            'clearStorage',
        ]),
        onDraftAppliedSuccess() {
            this.$addAlert({ type: 'success', message: 'Product updated' });
            this.$router.push('/products');
        },
        onDismiss() {
            this.$router.push('/products');
        },
        onSave() {
            const categoryIds = getMappedCategoryID(
                this.categories,
                this.selectedCategories,
            );
            const { params: { id } } = this.$route;
            this.updateProduct({
                id,
                data: {
                    categoryIds,
                },
            });
            this.applyDraft({
                id: this.id,
                onSuccess: this.onDraftAppliedSuccess,
            });
        },
    },
    async fetch({
        store,
        params,
    }) {
        const { language: languageCode } = store.state.authentication.user;
        const { id } = params;

        await Promise.all([
            store.dispatch('productsDraft/getCategories'),
            store.dispatch('productsDraft/getTemplates'),
            store.dispatch('productsDraft/getProductDraft', { languageCode, id }),
        ]);
        await store.dispatch('productsDraft/getProduct', { languageCode, id });
    },
};
</script>
