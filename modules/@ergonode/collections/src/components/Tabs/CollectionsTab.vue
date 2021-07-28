/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <CollectionsGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CollectionsGrid from '@Collections/components/Grids/CollectionsGrid';

export default {
    name: 'CollectionsTab',
    components: {
        CollectionsGrid,
    },
};
</script>
