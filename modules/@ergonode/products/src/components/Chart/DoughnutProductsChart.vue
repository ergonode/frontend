/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div
        class="products-doughnut-chart"
        :style="styles">
        <div class="products-doughnut-chart__description">
            <span
                class="products-doughnut-chart__title"
                v-text="dataCount" />
            <span class="products-doughnut-chart__subtitle">Products total</span>
        </div>
        <DoughnutChart
            class="products-doughnut-chart__doughnut"
            :data="chartData"
            :options="chartOptions" />
    </div>
</template>

<script>
import {
    GRAPHITE_COAL,
} from '@Core/assets/scss/_js-variables/colors.scss';
import DoughnutChart from '@Core/components/Chart/DoughnatChart';

export default {
    name: 'DoughnutProductsChart',
    components: {
        DoughnutChart,
    },
    props: {
        datasets: {
            type: Array,
            default: () => [],
        },
        /**
         * Number of visible data
         */
        dataCount: {
            type: Number,
            default: 0,
        },
        backgroundColor: {
            type: String,
            default: GRAPHITE_COAL,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
    },
    data() {
        return {
            chartData: {
                labels: [
                    'Products',
                ],
                datasets: this.datasets,
            },
        };
    },
    computed: {
        chartOptions() {
            return {
                cutoutPercentage: 94,
                tooltips: {
                    enabled: false,
                },
                legend: {
                    display: false,
                },
            };
        },
        styles() {
            return {
                backgroundColor: this.backgroundColor,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .products-doughnut-chart {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 999px;
        box-shadow: $ELEVATOR_6_DP;

        &__description {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__title {
            color: $WHITE;
            font: $FONT_SEMI_BOLD_40_48;
        }

        &__subtitle {
            margin-top: 4px;
            color: $GREY;
            font: $FONT_MEDIUM_12_16;
        }

        &__doughnut {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    }
</style>
