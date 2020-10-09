/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="dashboard-page">
        <VerticalFixedScroll>
            <div class="dashboard-page__content">
                <WelcomeUser />
                <div class="dashboard-page__widgets">
                    <ProductsWidget
                        v-show="productsCount.length > 0"
                        :products-count="productsCount" />
                    <CompletenessWidget
                        v-show="completenessCount.length > 0"
                        :completeness-count="completenessCount" />
                    <StatusesWidget
                        v-show="statusesCount.length > 0"
                        :statuses-count="statusesCount" />
                </div>
            </div>
        </VerticalFixedScroll>
    </div>
</template>

<script>
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import WelcomeUser from '@Dashboard/components/WelcomeUser/WelcomeUser';
import CompletenessWidget from '@Products/components/Widgets/CompletenessWidget';
import ProductsWidget from '@Products/components/Widgets/ProductsWidget';
import StatusesWidget from '@Statuses/components/Widgets/StatusesWidget';

export default {
    name: 'DashboardPage',
    components: {
        VerticalFixedScroll,
        WelcomeUser,
        ProductsWidget,
        CompletenessWidget,
        StatusesWidget,
    },
    props: {
        productsCount: {
            type: Array,
            default: () => [],
        },
        completenessCount: {
            type: Array,
            default: () => [],
        },
        statusesCount: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="scss" scoped>
    .dashboard-page {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        &__content {
            padding: 32px 40px 40px;
        }

        &__widgets {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(186px, 1fr));
            grid-template-rows: minmax(80px, auto);
            grid-auto-rows: 80px;
            grid-gap: 40px;
            margin-top: 40px;
        }
    }
</style>
