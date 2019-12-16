/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="page-selector">
        <span class="page-selector__text font--medium-12-16">
            Show
        </span>
        <Select
            :value="value"
            style="width: 72px;"
            :options="rowIntervalOptions"
            solid
            small
            @input="onValueChange" />
        <span
            class="page-selector__text font--medium-12-16"
            v-text="infoText" />
    </div>
</template>

<script>
import { ROW_INTERVALS } from '~/defaults/grid';

export default {
    name: 'GridPageSelector',
    components: {
        Select: () => import('~/core/components/Inputs/Select/Select'),
    },
    props: {
        rowsNumber: {
            type: Number,
            required: true,
        },
        value: {
            type: Number,
            default: null,
        },
    },
    computed: {
        infoText() {
            return `of ${this.rowsNumber}`;
        },
        rowIntervalOptions() {
            return ROW_INTERVALS.map((item) => ({ id: item, name: item }));
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
    @import "~assets/scss/grid/page-selector.scss";
</style>
