/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget
        :title="$t('@Dashboard.dashboard.components.ProductsWidget.title')"
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
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getProductsCount,
} from '@Dashboard/services';
import DoughnutProductsChart from '@Products/components/Chart/DoughnutProductsChart';
import {
    PRODUCT_TYPE_COLOR,
} from '@Products/defaults';

export default {
    name: 'ProductsWidget',
    components: {
        DoughnutProductsChart,
    },
    async fetch() {
        try {
            this.isPrefetchingData = true;

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
                    count,
                    label,
                    type,
                } = product;

                if (count > 0) {
                    progressListDatasets.push({
                        color: PRODUCT_TYPE_COLOR[type],
                        label,
                        value: count,
                    });
                    progressListLabels.push(count);
                    dataset.data.push(count);
                    dataset.backgroundColor.push(PRODUCT_TYPE_COLOR[type]);

                    maxValue += count;
                }
            });

            doughnutDatasets.push(dataset);

            this.doughnutDatasets = doughnutDatasets;
            this.progressListDatasets = progressListDatasets;
            this.progressListLabels = progressListLabels;
            this.maxValue = maxValue;
            this.isPrefetchingData = false;
        } catch (e) {
            if (this.$axios.isCancel(e)) {
                return;
            }

            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Dashboard.dashboard.components.ProductsWidget.getRequest'),
            });

            this.isPrefetchingData = false;
        }
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
