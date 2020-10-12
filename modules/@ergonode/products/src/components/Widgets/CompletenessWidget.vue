/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget
        title="Completeness"
        :is-placeholder-visible="!isPrefetchingData && progressListDatasets.length === 0">
        <template #body>
            <Preloader v-if="isPrefetchingData" />
            <ProgressList
                v-else
                :datasets="progressListDatasets"
                :labels="progressListLabels"
                :max-value="maxValue" />
        </template>
    </Widget>
</template>

<script>
import Preloader from '@Core/components/Preloader/Preloader';
import ProgressList from '@Core/components/ProgressList/ProgressList';
import Widget from '@Core/components/Widget/Widget';
import {
    COLORS,
} from '@Core/defaults/colors';
import {
    getCompletenessCount,
} from '@Dashboard/services';

export default {
    name: 'CompletenessWidget',
    components: {
        Widget,
        ProgressList,
        Preloader,
    },
    async fetch() {
        const completenessCount = await getCompletenessCount({
            $axios: this.$axios,
        });

        const progressListDatasets = [];
        const progressListLabels = [];

        completenessCount.forEach((product) => {
            const {
                code,
                value,
                label,
            } = product;

            if (typeof this.colors[code] === 'undefined') {
                this.colors[code] = COLORS[Math.floor(Math.random() * COLORS.length)];
            }

            progressListDatasets.push({
                color: this.colors[code],
                label,
                value,
            });
            progressListLabels.push(`${value * 100}%`);
        });

        this.progressListDatasets = progressListDatasets;
        this.progressListLabels = progressListLabels;
        this.isPrefetchingData = false;
    },
    data() {
        return {
            progressListDatasets: [],
            progressListLabels: [],
            maxValue: 1,
            colors: {},
            isPrefetchingData: true,
        };
    },
};
</script>
