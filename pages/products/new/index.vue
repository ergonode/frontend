/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductPage
        :title="title"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getMappedTemplateID } from '~/model/mappers/productMapper';
import { getMappedCategoryID } from '~/model/mappers/categoryMapper';

export default {
    name: 'Settings',
    middleware: ['tab/redirectToProductGeneral'],
    components: {
        ProductPage: () => import('~/components/Pages/ProductPage'),
    },
    data: () => ({
        title: 'New product',
    }),
    computed: {
        ...mapState('productsDraft', {
            sku: state => state.sku,
            template: state => state.template,
            templates: state => state.templates,
            selectedCategories: state => state.selectedCategories,
            categories: state => state.categories,
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
            this.$router.back();
        },
        onCreateProductSuccess(id) {
            this.removeValidationErrors();
            this.$addAlert(this.$store, { type: 'success', message: 'ProductDesigner created' });
            this.$router.push({
                name: 'products-edit-id',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            this.removeValidationErrors();
            const data = {
                sku: this.sku,
                templateId: getMappedTemplateID(
                    this.templates,
                    this.template,
                ),
            };
            if (this.selectedCategories.length > 0) {
                data.categoryIds = getMappedCategoryID(
                    this.categories,
                    this.selectedCategories,
                );
            }
            this.createProduct({
                data,
                onSuccess: this.onCreateProductSuccess,
                onError: this.onError,
            });
        },
    },
    async fetch({ store }) {
        await store.dispatch('productsDraft/clearStorage');

        return store.dispatch('productsDraft/getTemplates', { onError: () => {} })
            && store.dispatch('productsDraft/getCategories', { onError: () => {} });
    },
};
</script>
