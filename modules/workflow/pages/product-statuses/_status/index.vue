/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductStatusPage
        title="New Status"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapActions } from 'vuex';
import { getParentRoutePath } from '@Core/models/navigation/tabs';

export default {
    name: 'StatusNew',
    components: {
        ProductStatusPage: () => import('~/components/Pages/ProductStatusPage'),
    },
    created() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('productStatus', [
            'createProductStatus',
            'clearStorage',
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
            this.$router.push(getParentRoutePath(this.$route));
        },
        onProductStatusCreated(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Product status created' });
            this.$router.push({
                name: 'product-status-edit-id-general',
                params: {
                    id,
                },
            });
        },
    },
};
</script>
