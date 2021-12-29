/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <SegmentsGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import SegmentsGrid from '@Segments/components/Grids/SegmentsGrid';

export default {
    name: 'SegmentsGridTab',
    components: {
        SegmentsGrid,
    },
};
</script>
