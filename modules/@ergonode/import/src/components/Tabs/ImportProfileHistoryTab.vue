/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <ImportProfileHistoryGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ImportProfileHistoryGrid from '@Import/components/Grids/ImportProfileHistoryGrid';

export default {
    name: 'CollectionProductsTab',
    components: {
        ImportProfileHistoryGrid,
    },
};
</script>
