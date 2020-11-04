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
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import ProductPage from '@Products/components/Pages/ProductPage';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductEdit',
    components: {
        ProductPage,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        app,
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
                onError: () => {
                    if (process.client) {
                        app.$addAlert({
                            type: ALERT_TYPE.ERROR,
                            message: 'Product draft hasn’t been fetched properly',
                        });
                    }
                },
            }),
            store.dispatch('product/getProduct', {
                id,
                onError: () => {
                    if (process.client) {
                        app.$addAlert({
                            type: ALERT_TYPE.ERROR,
                            message: 'Product hasn’t been fetched properly',
                        });
                    }
                },
            }),
        ]);
    },
    computed: {
        ...mapState('product', [
            'sku',
        ]),
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('product', [
            'removeProduct',
            '__clearStorage',
            'getProductDraft',
            'getProduct',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: 'Are you sure you want to delete this product?',
                applyTitle: 'YES, I\'M SURE',
                action: () => this.removeProduct({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product removed',
            });
            this.$router.push({
                name: 'catalog-products',
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Product hasn’t been deleted',
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
