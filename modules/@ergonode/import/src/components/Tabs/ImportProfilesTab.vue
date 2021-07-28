/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <ImportProfilesGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ImportProfilesGrid from '@Import/components/Grids/ImportProfilesGrid';

export default {
    name: 'ImportProfilesTab',
    components: {
        ImportProfilesGrid,
    },
};
</script>
