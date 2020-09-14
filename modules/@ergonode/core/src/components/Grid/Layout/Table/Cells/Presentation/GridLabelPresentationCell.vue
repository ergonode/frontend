/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-label-presentation-cell">
        <PointBadge
            v-if="color"
            :color="color" />
        <GridPresentationCell :value="value" />
    </div>
</template>

<script>
import PointBadge from '@Core/components/Badges/PointBadge';
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';

export default {
    name: 'GridLabelPresentationCell',
    components: {
        PointBadge,
        GridPresentationCell,
    },
    props: {
        value: {
            type: String,
            required: true,
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
    .grid-label-presentation-cell {
        display: flex;
        flex: 1;
        align-items: center;

        & > .point-badge {
            margin-left: 8px;
        }
    }
</style>
