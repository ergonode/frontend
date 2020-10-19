/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-page-selector">
        <span class="grid-page-selector__text">
            Show
        </span>
        <Select
            :value="value"
            :options="rowIntervalOptions"
            :size="smallSize"
            @input="onValueChange" />
        <span
            class="grid-page-selector__text"
            v-text="infoText" />
    </div>
</template>

<script>
import Select from '@Core/components/Select/Select';
import {
    ROW_INTERVALS,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'GridPageSelector',
    components: {
        Select,
    },
    props: {
        /**
         * Max visible rows for *currentPage* at Grid
         */
        maxRows: {
            type: Number,
            required: true,
        },
        /**
         * Component value
         */
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
    .grid-page-selector {
        display: grid;
        align-items: center;
        grid-template-columns: max-content 72px max-content;
        grid-auto-flow: column;
        column-gap: 8px;
        margin-left: 8px;

        &__text {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
        }
    }
</style>
