/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget title="Completeness">
        <template #body>
            <ProgressList
                :datasets="progressListDatasets"
                :labels="progressListLabels"
                :max-value="maxValue" />
        </template>
    </Widget>
</template>

<script>
import ProgressList from '@Core/components/ProgressList/ProgressList';
import Widget from '@Core/components/Widget/Widget';
import {
    COLORS,
} from '@Core/defaults/colors';

export default {
    name: 'CompletenessWidget',
    components: {
        Widget,
        ProgressList,
    },
    props: {
        completenessCount: {
            type: Array,
            required: true,
        },
    },
    data() {
        const progressListDatasets = [];
        const progressListLabels = [];
        let maxValue = 0;

        this.completenessCount.forEach((product) => {
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

                maxValue += count;
            }
        });

        return {
            progressListDatasets,
            progressListLabels,
            maxValue,
        };
    },

};
</script>
