/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="dashboard">
        <DashboardPage v-if="hasAnyProductInSystem" />
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

export default {
    name: 'Dashboard',
    components: {
        DashboardPage,
        EmptyDashboardPage,
    },
    async asyncData({
        app,
    }) {
        let productsCount = 0;

        try {
            productsCount = await getProductsCount({
                $axios: app.$axios,
            });
        } catch (e) {
            if (app.$axios.isCancel(e)) {
                return {
                    productsCount,
                };
            }
        }

        return {
            productsCount,
        };
    },
    computed: {
        hasAnyProductInSystem() {
            return this.productsCount.some(product => product.count > 0);
        },
    },
    methods: {
        async onProductCreated() {
            this.productsCount = await getProductsCount({
                $axios: this.$axios,
            });
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
