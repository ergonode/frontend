/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductStatusPage
        title="New attribute"
        is-edit
        @dismiss="onDismiss"
        @save="onSave" />
</template>

<script>

import { mapActions } from 'vuex';
import productStatusModule from '~/reusableStore/productStatus/state';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'Id',
    middleware: ['tab/redirectToProductStatusGeneral'],
    components: {
        ProductStatusPage: () => import('~/components/Pages/ProductStatusPage'),
    },
    async beforeCreate() {
        this.$registerStore({
            module: productStatusModule,
            moduleName: 'productStatus',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('productStatus');
    },
    methods: {
        ...mapActions('productStatus', [
            'updateProductStatus',
            'removeProductStatus',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onSave() {
            this.updateProductStatus({
                onSuccess: this.onProductStatusUpdated,
                onError: this.onError,
            });
        },
        onDismiss() {
            this.$router.push('/workflow/statuses');
        },
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this product status?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.removeProductStatus({
                    onSuccess: this.onRemoveProductStatusSuccess,
                    onError: message => this.$addAlert({ type: 'error', message }),
                });
            }
        },
        onRemoveProductStatusSuccess() {
            this.$addAlert({ type: 'success', message: 'Product status removed' });
            this.$router.push('/workflow/statuses');
        },
        onProductStatusUpdated() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Product status updated' });
            this.$router.push('/workflow/statuses');
        },
    },
    async fetch({
        app, store, params,
    }) {
        app.$registerStore({
            module: productStatusModule,
            moduleName: 'productStatus',
            store,
        });
        const path = `${store.state.authentication.user.language}/workflow/status/${params.id}`;
        await store.dispatch('productStatus/getProductStatus', {
            path,
        });
    },
};
</script>
