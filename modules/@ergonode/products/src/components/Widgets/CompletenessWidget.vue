/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget title="Completeness">
        <template #body>
            <ProgressList
                :datasets="datasets"
                :labels="labels"
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
import {
    mapGetters,
} from 'vuex';

export default {
    name: 'CompletenessWidget',
    components: {
        Widget,
        ProgressList,
    },
    data() {
        return {
            datasets: [],
            labels: [],
            maxValue: 100,
        };
    },
    computed: {
        ...mapGetters('core', [
            'activeLanguages',
        ]),
    },
    mounted() {
        function randomInt(min, max) {
            return min + Math.floor((max - min) * Math.random());
        }

        this.activeLanguages.forEach((language) => {
            const value = randomInt(0, 100);

            this.datasets.push({
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                label: language.name || language.code,
                value,
            });
            this.labels.push(`${value}%`);
        });
    },
};
</script>
