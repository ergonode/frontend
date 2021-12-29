/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="dashboard">
        <Preloader v-if="isFetchingData" />
        <DashboardPage v-else-if="hasAnyProductInSystem" />
        <EmptyDashboardPage
            v-else
            @product-created="onProductCreated" />
    </div>
</template>

<script>

import DashboardPage from '@Dashboard/components/Pages/DashboardPage';
import EmptyDashboardPage from '@Dashboard/components/Pages/EmptyDashboardPage';
import {
    getProductsCount,
} from '@Dashboard/services';
import PRODUCT_PRIVILEGES from '@Products/config/privileges';

export default {
    name: 'Dashboard',
    components: {
        DashboardPage,
        EmptyDashboardPage,
    },
    async fetch() {
        await this.onProductCreated();

        this.isFetchingData = false;
    },
    data() {
        return {
            isFetchingData: true,
            productsCount: [],
        };
    },
    computed: {
        hasAnyProductInSystem() {
            return this.productsCount.some(product => product.count > 0);
        },
        isAllowedToReadProduct() {
            return this.$hasAccess([
                PRODUCT_PRIVILEGES.PRODUCT.read,
            ]);
        },
    },
    methods: {
        async onProductCreated() {
            if (this.isAllowedToReadProduct) {
                try {
                    this.productsCount = await getProductsCount({
                        $axios: this.$axios,
                    });
                } catch (e) {
                    if (this.$axios.isCancel(e)) {
                        this.productsCount = [];
                    }
                }
            }
        },
    },
    head() {
        return {
            title: this.$t('@Dashboard.dashboard._.headTitle'),
        };
    },
};
</script>

<style lang="scss" scoped>
    .dashboard {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: $GRAPHITE_COAL;
    }
</style>
