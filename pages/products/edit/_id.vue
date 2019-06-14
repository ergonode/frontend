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
            this.$addAlert(this.$store, { type: 'success', message: 'Product updated' });
            this.$router.push('/products');
        },
        onDraftAppliedError() {
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
                onSuccess: () => {},
                onError: () => {},
            });
            this.applyDraft({
                id: this.id,
                onSuccess: this.onDraftAppliedSuccess,
                onError: this.onDraftAppliedError,
            });
        },
    },
    async fetch({
        store,
        params,
        error,
    }) {
        const { language: languageCode } = store.state.authentication.user;
        const { id } = params;
        await store.dispatch('productsDraft/getProductDraft', {
            languageCode,
            id,
            onError: (err) => {
                if (err.response && err.response.status === 404) {
                    return error({ statusCode: 404, message: err.message });
                }
                return error();
            },
        });
    },
};
</script>
