/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
                :label="item.label" />
            <span
                :key="`divider-${index}`"
                class="progress-list__data-label"
                v-text="labels[index]" />
        </template>
    </div>
</template>

<script>

export default {
    name: 'ProgressList',
    props: {
        /**
         * List of data
         */
        datasets: {
            type: Array,
            default: () => [],
        },
        /**
         * List of labels connected with *datasets*
         */
        labels: {
            type: Array,
            default: () => [],
        },
        /**
         * Max value for given value from *datasets*
         */
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
