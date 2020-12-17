/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <RolesGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import RolesGrid from '@Users/components/Grids/RolesGrid';

export default {
    name: 'RolesTab',
    components: {
        RolesGrid,
        CenterViewTemplate,
    },
};
</script>
