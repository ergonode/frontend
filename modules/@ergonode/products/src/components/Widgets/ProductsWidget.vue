/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget title="Products">
        <template #body>
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
    </Widget>
</template>

<script>
import {
    GREY,
} from '@Core/assets/scss/_js-variables/colors.scss';
import ProgressList from '@Core/components/ProgressList/ProgressList';
import Widget from '@Core/components/Widget/Widget';
import {
    COLORS,
} from '@Core/defaults/colors';
import DoughnutProductsChart from '@Products/components/Chart/DoughnutProductsChart';

export default {
    name: 'ProductsWidget',
    components: {
        Widget,
        DoughnutProductsChart,
        ProgressList,
    },
    props: {
        productsCount: {
            type: Array,
            required: true,
        },
    },
    data() {
        const doughnutDatasets = [];
        const progressListDatasets = [];
        const progressListLabels = [];
        let maxValue = 0;

        this.productsCount.forEach((product) => {
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
                doughnutDatasets.push({
                    data: [
                        count,
                    ],
                    backgroundColor: [
                        color,
                    ],
                    borderWidth: 0,
                });

                maxValue += count;
            }
        });

        if (!doughnutDatasets.length) {
            doughnutDatasets.push({
                data: [
                    100,
                ],
                backgroundColor: [
                    GREY,
                ],
                borderWidth: 0,
            });
        }

        return {
            doughnutDatasets,
            progressListDatasets,
            progressListLabels,
            maxValue,
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
