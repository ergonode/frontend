/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductPage
        title="New Product"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentRoutePath } from '@Core/models/navigation/tabs';

export default {
    name: 'ProductNew',
    components: {
        ProductPage: () => import('@Products/components/Pages/ProductPage'),
    },
    computed: {
        ...mapState('productsDraft', {
            sku: (state) => state.sku,
            template: (state) => state.template,
            templates: (state) => state.templates,
            selectedCategories: (state) => state.selectedCategories,
        }),
    },
    methods: {
        ...mapActions('productsDraft', [
            'createProduct',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onCreateProductSuccess(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Product created' });
            this.$router.push({
                name: 'product-edit-id-general',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            this.removeValidationErrors();
            const data = {
                sku: this.sku,
                templateId: this.template.id,
            };
            if (this.selectedCategories.length > 0) {
                data.categoryIds = this.selectedCategories.map((category) => category.id);
            }
            this.createProduct({
                data,
                onSuccess: this.onCreateProductSuccess,
                onError: this.onError,
            });
        },
    },
    async fetch({ store }) {
        await Promise.all([
            store.dispatch('productsDraft/clearStorage'),
            store.dispatch('productsDraft/getTemplates'),
            store.dispatch('productsDraft/getCategories'),
        ]);
    },
};
</script>
