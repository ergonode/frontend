/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="status-presentation-cell">
        <PointBadge :color="color" />
        <GridPresentationCell :value="value" />
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
        value: {
            type: String,
            required: true,
        },
        color: {
            type: String,
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
