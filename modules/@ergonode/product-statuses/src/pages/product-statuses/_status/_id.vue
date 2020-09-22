/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductStatusPage
        :title="code"
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
    name: 'StatusEdit',
    components: {
        ProductStatusPage: () => import('@Statuses/components/Pages/ProductStatusPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('productStatus/getProductStatus', params);
        await store.dispatch('productStatus/getDefaultStatus');
    },
    computed: {
        ...mapState('productStatus', {
            code: state => state.code,
            isDefaultStatus: state => state.isDefaultStatus,
        }),
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearTranslationsStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('productStatus', [
            'removeProductStatus',
            '__clearStorage',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        ...mapActions('tab', {
            __clearTranslationsStorage: '__clearStorage',
        }),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this product status?',
                confirmCallback: () => this.removeProductStatus({
                    onSuccess: this.onRemoveProductStatusSuccess,
                }),
            });
        },
        onRemoveProductStatusSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product status removed',
            });
            this.$router.push({
                name: 'product-statuses-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.code} - Product statuses - Ergonode`,
        };
    },
};
</script>
