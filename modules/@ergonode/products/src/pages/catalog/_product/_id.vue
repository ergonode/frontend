/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductPage
        :title="sku"
        @remove="onRemove" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductEdit',
    components: {
        ProductPage: () => import('@Products/components/Pages/ProductPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store,
        params,
    }) {
        const {
            defaultLanguageCode,
        } = store.state.core;
        const {
            id,
        } = params;

        await Promise.all([
            store.dispatch('product/getProductDraft', {
                languageCode: defaultLanguageCode,
                id,
            }),
            store.dispatch('product/getProduct', id),
        ]);
    },
    computed: {
        ...mapState('product', [
            'sku',
        ]),
    },
    beforeDestroy() {
        this.__clearStorage();
        this.removeErrors();
    },
    methods: {
        ...mapActions('product', [
            'removeProduct',
            '__clearStorage',
        ]),
        ...mapActions('validations', [
            'removeErrors',
        ]),
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product removed',
            });
            this.$router.push({
                name: 'catalog-products',
            });
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
    },
    head() {
        return {
            title: `${this.sku} - Products - Ergonode`,
        };
    },
};
</script>
