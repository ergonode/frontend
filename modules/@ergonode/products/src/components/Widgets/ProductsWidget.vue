/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget
        title="Products"
        :is-placeholder-visible="!isPrefetchingData && progressListLabels.length === 0">
        <template #body>
            <Preloader v-if="isPrefetchingData" />
            <template v-else>
                <div class="total-products-chart">
                    <DoughnutProductsChart
                        :style="{ height: '192px', width: '192px' }"
                        :data-count="maxValue"
                        :datasets="doughnutDatasets" />
                </div>
                <ProgressList
                    :datasets="progressListDatasets"
                    :labels="progressListLabels"
                    :max-value="maxValue" />
            </template>
        </template>
    </Widget>
</template>

<script>
import {
    COLORS,
} from '@Core/defaults/colors';
import {
    getProductsCount,
} from '@Dashboard/services';
import DoughnutProductsChart from '@Products/components/Chart/DoughnutProductsChart';
import Preloader from '@UI/components/Preloader/Preloader';
import ProgressList from '@UI/components/ProgressList/ProgressList';
import Widget from '@UI/components/Widget/Widget';

export default {
    name: 'ProductsWidget',
    components: {
        Widget,
        DoughnutProductsChart,
        ProgressList,
        Preloader,
    },
    async fetch() {
        const productsCount = await getProductsCount({
            $axios: this.$axios,
        });

        const doughnutDatasets = [];
        const progressListDatasets = [];
        const progressListLabels = [];
        let maxValue = 0;

        const dataset = {
            data: [],
            backgroundColor: [],
            borderWidth: 0,
        };

        productsCount.forEach((product) => {
            const {
                count, label,
            } = product;

            if (count > 0) {
                const color = COLORS[Math.floor(Math.random() * COLORS.length)];

                progressListDatasets.push({
                    color,
                    label,
                    value: count,
                });
                progressListLabels.push(count);
                dataset.data.push(count);
                dataset.backgroundColor.push(color);

                maxValue += count;
            }
        });

        doughnutDatasets.push(dataset);

        this.doughnutDatasets = doughnutDatasets;
        this.progressListDatasets = progressListDatasets;
        this.progressListLabels = progressListLabels;
        this.maxValue = maxValue;
        this.isPrefetchingData = false;
    },
    data() {
        return {
            doughnutDatasets: [],
            progressListDatasets: [],
            progressListLabels: [],
            maxValue: 0,
            isPrefetchingData: true,
        };
    },
};
</script>

<style lang="scss" scoped>
    .total-products-chart {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
    }
</style>
