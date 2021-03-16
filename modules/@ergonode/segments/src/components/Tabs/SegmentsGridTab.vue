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
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'SegmentsGridTab',
    components: {
        CenterViewTemplate,
        SegmentsGrid,
    },
};
</script>
