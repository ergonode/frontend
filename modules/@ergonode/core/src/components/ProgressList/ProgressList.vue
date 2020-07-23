/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="progress-list">
        <template v-for="(item, index) in datasets">
            <ComplexProgressBar
                :key="index"
                :value="item.value"
                :max-value="maxValue"
                :color="item.color"
                :label="item.label"
                :label-value="item.labelValue" />
            <span
                :key="`divider-${index}`"
                class="progress-list__data-label"
                v-text="labels[index]" />
        </template>
    </div>
</template>

<script>
import ComplexProgressBar from '@Core/Components/ProgressBar/Complex/ComplexProgressBar';

export default {
    name: 'ProgressList',
    components: {
        ComplexProgressBar,
    },
    props: {
        datasets: {
            type: Array,
            default: () => [],
        },
        labels: {
            type: Array,
            default: () => [],
        },
        maxValue: {
            type: Number,
            default: 100,
        },
    },
};
</script>

<style lang="scss" scoped>
    .progress-list {
        display: grid;
        grid-template-columns: auto max-content;
        grid-auto-flow: row;
        grid-gap: 24px;

        &__data-label {
            color: $WHITE;
            font: $FONT_SEMI_BOLD_24_32;
        }
    }
</style>
