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
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'ImportProfilesTab',
    components: {
        CenterViewTemplate,
        ImportProfilesGrid,
    },
};
</script>
