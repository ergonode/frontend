/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget
        :title="$t('@Dashboard.dashboard.components.CompletenessWidget.title')"
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
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getCompletenessCount,
} from '@Dashboard/services';
import {
    GREEN,
    RED,
    YELLOW,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'CompletenessWidget',
    async fetch() {
        try {
            const completenessCount = await getCompletenessCount({
                $axios: this.$axios,
            });

            const progressListDatasets = [];
            const progressListLabels = [];

            completenessCount.forEach((product) => {
                const {
                    value,
                    label,
                } = product;

                const color = [
                    RED,
                    YELLOW,
                    GREEN,
                ][Math.floor(value / 40)];

                progressListDatasets.push({
                    color,
                    label,
                    value,
                });
                progressListLabels.push(`${value}%`);
            });

            this.progressListDatasets = progressListDatasets;
            this.progressListLabels = progressListLabels;
            this.isPrefetchingData = false;
        } catch (e) {
            if (this.$axios.isCancel(e)) {
                return;
            }

            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Dashboard.dashboard.components.CompletenessWidget.getRequest'),
            });

            this.isPrefetchingData = false;
        }
    },
    data() {
        return {
            progressListDatasets: [],
            progressListLabels: [],
            maxValue: 100,
            colors: {},
            isPrefetchingData: true,
        };
    },
};
</script>
