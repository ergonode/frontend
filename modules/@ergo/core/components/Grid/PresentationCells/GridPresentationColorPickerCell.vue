/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="status-presentation-cell">
        <PointBadge
            v-if="colors[cellData.key]"
            :color="colors[cellData.key] || ''" />
        <GridPresentationCell :value="cellData.value || `#${cellData.key}`" />
    </div>
</template>

<script>
import PointBadge from '@Core/components/Badges/PointBadge';
import GridPresentationCell from '@Core/components/Grid/PresentationCells/GridPresentationCell';

export default {
    name: 'GridPresentationColorPickerCell',
    components: {
        PointBadge,
        GridPresentationCell,
    },
    props: {
        cellData: {
            type: Object,
            required: true,
        },
        colors: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .status-presentation-cell {
        display: flex;
        flex: 1;
        align-items: center;
        padding-left: 8px;
    }
</style>
