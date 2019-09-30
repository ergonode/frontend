/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="status-info-cell">
        <StatusBadge :color="colors[cellData.key]" />
        <GridInfoCell :value="cellData.value" />
    </div>
</template>

<script>
import StatusBadge from '~/components/Badges/StatusBadge';
import GridInfoCell from '~/components/Grid/GridInfoCell';

export default {
    name: 'GridStatusInfoCell',
    components: {
        StatusBadge,
        GridInfoCell,
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
    .status-info-cell {
        display: flex;
        flex: 1;
        align-items: center;
        padding-left: 8px;
    }
</style>
