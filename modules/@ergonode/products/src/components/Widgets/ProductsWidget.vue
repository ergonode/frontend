/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget title="Products">
        <template #body>
            <div class="total-products-chart">
                <DoughnutProductsChart :style="{ height: '192px', width: '192px' }" />
            </div>
            <ProgressList
                :datasets="datasets"
                :labels="labels"
                :max-value="maxValue" />
        </template>
    </Widget>
</template>

<script>
import {
    BLUE,
    GREEN,
    YELLOW,
} from '@Core/assets/scss/_js-variables/colors.scss';
import ProgressList from '@Core/components/ProgressList/ProgressList';
import Widget from '@Core/components/Widget/Widget';
import DoughnutProductsChart from '@Products/components/Chart/DoughnutProductsChart';

export default {
    name: 'ProductsWidget',
    components: {
        Widget,
        DoughnutProductsChart,
        ProgressList,
    },
    data() {
        return {
            datasets: [
                {
                    color: GREEN,
                    label: 'Simple products',
                    value: 2950,
                },
                {
                    color: YELLOW,
                    label: 'Products with variants',
                    value: 134,
                },
                {
                    color: BLUE,
                    label: 'Grouping products',
                    value: 205,
                },
            ],
            labels: [
                '2950',
                '134',
                '205',
            ],
            maxValue: 2950 + 134 + 205,
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
