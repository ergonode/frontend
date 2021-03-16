/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <CategoryTreesGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CategoryTreesGrid from '@Trees/components/Grids/CategoryTreesGrid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'CategoryTreesTab',
    components: {
        CategoryTreesGrid,
        CenterViewTemplate,
    },
};
</script>
