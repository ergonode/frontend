/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductPage
        :title="sku"
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentRoutePath } from '@Core/models/navigation/tabs';

export default {
    name: 'ProductEdit',
    components: {
        ProductPage: () => import('@Products/components/Pages/ProductPage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
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
    computed: {
        ...mapState('productsDraft', {
            id: state => state.id,
            sku: state => state.sku,
            selectedCategories: state => state.selectedCategories,
        }),
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('productsDraft', [
            'updateProduct',
            'removeProduct',
            'applyDraft',
            'clearStorage',
        ]),
        onDraftAppliedSuccess() {
            this.$addAlert({ type: 'success', message: 'Product updated' });
            this.$router.push({ name: 'catalog-products' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: 'success', message: 'Product removed' });
            this.$router.push({ name: 'catalog-products' });
        },
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this product?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.removeProduct({
                    onSuccess: this.onRemoveSuccess,
                });
            }
        },
        async onSave() {
            const { params: { id } } = this.$route;

            await this.updateProduct({
                id,
                data: {
                    categoryIds: this.selectedCategories.map(category => category.id),
                },
            });
            await this.applyDraft({
                id: this.id,
                onSuccess: this.onDraftAppliedSuccess,
            });
        },
    },
};
</script>
