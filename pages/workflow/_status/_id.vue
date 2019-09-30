/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductStatusPage
        :title="code"
        is-edit
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'StatusEdit',
    middleware: ['tab/redirectToProductStatusGeneral'],
    components: {
        ProductStatusPage: () => import('~/components/Pages/ProductStatusPage'),
    },
    computed: {
        ...mapState('productStatus', {
            code: (state) => state.code,
        }),
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
        store, params,
    }) {
        const path = `${store.state.authentication.user.language}/status/${params.id}`;
        await store.dispatch('productStatus/getProductStatus', {
            path,
        });
    },
};
</script>
