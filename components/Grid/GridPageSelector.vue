/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="page-selector">
        <Label
            text="Show"
            class="page-selector__text" />
        <Select
            v-model="internalValue"
            style="width: 72px;"
            :options="rowIntervals"
            solid />
        <Label
            :text="infoText"
            class="page-selector__text" />
    </div>
</template>

<script>
import nestedVModelMixin from '~/mixins/nestedVModelMixin';

export default {
    name: 'GridPageSelector',
    components: {
        Select: () => import('~/components/Inputs/Select/Select'),
        Label: () => import('~/components/Label/Label'),
    },
    mixins: [nestedVModelMixin],
    props: {
        rowsNumber: {
            type: Number,
            required: true,
        },
    },
    data: () => ({
        rowIntervals: ['25', '50', '100', '200', '400', '800'],
    }),
    computed: {
        infoText() {
            return `of ${this.rowsNumber}`;
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/grid/page-selector.scss";
</style>
