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
            :options="rowIntervals"
            solid
            small
            @input="onValueChange" />
        <span
            class="page-selector__text font--medium-12-16"
            v-text="infoText" />
    </div>
</template>

<script>
export default {
    name: 'GridPageSelector',
    components: {
        Select: () => import('~/components/Inputs/Select/Select'),
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
    data: () => ({
        rowIntervals: ['25', '50', '100', '200'],
    }),
    computed: {
        infoText() {
            return `of ${this.rowsNumber}`;
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
