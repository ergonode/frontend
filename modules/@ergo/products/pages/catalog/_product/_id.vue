/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductPage
        :title="sku"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { MODAL_TYPE } from '@Core/defaults/modals';
import { PRODUCT_TYPE } from '@Products/defaults';
import { getKeyByValue } from '@Core/models/objectWrapper';

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
        const { defaultLanguageCodeByPrivileges } = store.state.core;
        const { id } = params;

        await store.dispatch('product/getProductDraft', { languageCode: defaultLanguageCodeByPrivileges, id });
        await store.dispatch('product/getProductById', id);
    },
    computed: {
        ...mapState('product', {
            id: state => state.id,
            sku: state => state.sku,
            type: state => state.type,
            template: state => state.template,
            categories: state => state.categories,
            bindingAttributesIds: state => state.bindingAttributesIds,
        }),
        ...mapState('dictionaries', {
            productTypes: state => state.productTypes,
        }),
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('product', [
            'updateProduct',
            'removeProduct',
            'applyDraft',
            'clearStorage',
        ]),
        onDraftAppliedSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Product updated' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Product removed' });
            this.$router.push({ name: 'catalog-products' });
        },
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this product?',
                confirmCallback: () => this.removeProduct({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
        async onSave() {
            const { params: { id } } = this.$route;
            const data = {
                templateId: this.template,
                categoryIds: this.categories,
            };

            if (getKeyByValue(this.productTypes, this.type) === PRODUCT_TYPE.WITH_VARIANTS) {
                data.bindings = this.bindingAttributesIds;
            }

            await this.updateProduct({
                id,
                data,
            });
            await this.applyDraft({
                id: this.id,
                onSuccess: this.onDraftAppliedSuccess,
            });
        },
    },
    head() {
        return {
            title: `${this.sku} - Products - Ergonode`,
        };
    },
};
</script>
