/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="label-presentation-cell">
        <PointBadge
            v-if="color"
            :color="color" />
        <GridSelectPresentationCell
            :value="value"
            :options="options" />
    </div>
</template>

<script>
import PointBadge from '@Core/components/Badges/PointBadge';
import GridSelectPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridSelectPresentationCell';

export default {
    name: 'GridLabelPresentationCell',
    components: {
        PointBadge,
        GridSelectPresentationCell,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        options: {
            type: Object,
            default: () => ({}),
        },
        colors: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        color() {
            return this.colors[this.value];
        },
    },
};
</script>

<style lang="scss" scoped>
    .label-presentation-cell {
        display: flex;
        flex: 1;
        align-items: center;
        padding-left: 8px;
    }
</style>
