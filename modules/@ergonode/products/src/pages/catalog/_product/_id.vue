/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductPage :title="sku" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
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

        await store.dispatch('dictionaries/getInitialDictionaries', {
            keys: [
                'productTypes',
            ],
        });

        await Promise.all([
            store.dispatch('product/getProductDraft', {
                languageCode: defaultLanguageCode,
                id,
                onError: () => {
                    app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: 'Product draft hasn’t been fetched properly',
                    });
                },
            }),
            store.dispatch('product/getProduct', {
                id,
                onError: () => {
                    app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: 'Product hasn’t been fetched properly',
                    });
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
            '__clearStorage',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
    },
    head() {
        return {
            title: `${this.sku} - Products - Ergonode`,
        };
    },
};
</script>
