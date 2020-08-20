/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="page-selector">
        <span class="page-selector__text">
            Show
        </span>
        <Select
            :value="value"
            style="width: 72px;"
            :options="rowIntervalOptions"
            :size="smallSize"
            @input="onValueChange" />
        <span
            class="page-selector__text"
            v-text="infoText" />
    </div>
</template>

<script>
import {
    ROW_INTERVALS,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'GridPageSelector',
    components: {
        Select: () => import('@Core/components/Inputs/Select/Select'),
    },
    props: {
        maxRows: {
            type: Number,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        infoText() {
            return `of ${this.maxRows}`;
        },
        rowIntervalOptions() {
            return ROW_INTERVALS;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .page-selector {
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        column-gap: 8px;
        margin-left: 8px;

        &__text {
            flex: 0 0 auto;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
        }
    }
</style>
