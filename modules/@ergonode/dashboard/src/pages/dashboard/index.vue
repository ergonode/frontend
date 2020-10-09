/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="dashboard">
        <DashboardPage
            v-if="hasAnyProductInSystem"
            :products-count="productsCount"
            :completeness-count="completenessCount"
            :statuses-count="statusesCount" />
        <EmptyDashboardPage
            v-else
            @product-created="onProductCreated" />
    </div>
</template>

<script>

import DashboardPage from '@Dashboard/components/Pages/DashboardPage';
import EmptyDashboardPage from '@Dashboard/components/Pages/EmptyDashboardPage';
import {
    getCompletenessCount,
    getProductsCount,
    getStatusesCount,
} from '@Dashboard/services';

export default {
    name: 'Dashboard',
    components: {
        DashboardPage,
        EmptyDashboardPage,
    },
    async asyncData({
        app,
    }) {
        const [
            productsCount,
            completenessCount,
            statusesCount,
        ] = await Promise.all([
            getProductsCount({
                $axios: app.$axios,
            }),
            getCompletenessCount({
                $axios: app.$axios,
            }),
            getStatusesCount({
                $axios: app.$axios,
            }),
        ]);

        return {
            productsCount,
            completenessCount,
            statusesCount,
        };
    },
    computed: {
        hasAnyProductInSystem() {
            return this.productsCount.some(product => product.count > 0);
        },
    },
    methods: {
        async onProductCreated() {
            const [
                productsCount,
                completenessCount,
                statusesCount,
            ] = await Promise.all([
                getProductsCount({
                    $axios: this.$axios,
                }),
                getCompletenessCount({
                    $axios: this.$axios,
                }),
                getStatusesCount({
                    $axios: this.$axios,
                }),
            ]);

            this.productsCount = productsCount;
            this.completenessCount = completenessCount;
            this.statusesCount = statusesCount;
        },
    },
    head() {
        return {
            title: 'Dashboard - Ergonode',
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
