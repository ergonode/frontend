/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductStatusPage
        :title="code"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>

import { mapState, mapActions } from 'vuex';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { MODAL_TYPE } from '@Core/defaults/modals';

export default {
    name: 'StatusEdit',
    components: {
        ProductStatusPage: () => import('@Statuses/components/Pages/ProductStatusPage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        const path = `${store.state.authentication.user.language}/status/${params.id}`;

        await store.dispatch('productStatus/clearStorage');
        await store.dispatch('productStatus/getProductStatus', path);
        await store.dispatch('productStatus/getDefaultStatus');
    },
    computed: {
        ...mapState('productStatus', {
            code: state => state.code,
            isDefaultStatus: state => state.isDefaultStatus,
        }),
    },
    methods: {
        ...mapActions('productStatus', [
            'updateProductStatus',
            'updateDefaultStatus',
            'removeProductStatus',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onSave() {
            const requests = [
                this.updateProductStatus({
                    onError: this.onError,
                }),
                this.updateDefaultStatus(),
            ];

            Promise.all(requests).then(() => {
                this.onProductStatusUpdated();
            });
        },
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
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Product status removed' });
            this.$router.push({ name: 'product-statuses-grid' });
        },
        onProductStatusUpdated() {
            this.removeValidationErrors();
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Product status updated' });
        },
    },
    head() {
        return {
            title: `${this.code} - Product statuses - Ergonode`,
        };
    },
};
</script>
