/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductStatusPage
        title="New attribute"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapActions } from 'vuex';
import productStatusModule from '~/reusableStore/productStatus/state';

export default {
    name: 'NewAttribute',
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
            'createProductStatus',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onCreate() {
            this.createProductStatus({
                onSuccess: this.onProductStatusCreated,
                onError: this.onError,
            });
        },
        onDismiss() {
            this.$router.push('/workflow/statuses');
        },
        onProductStatusCreated(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Product status created' });
            this.$router.push({
                name: 'workflow-statuses-edit-id',
                params: {
                    id,
                },
            });
        },
    },
};
</script>
