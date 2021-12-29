/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
import RolesGrid from '@Roles/components/Grids/RolesGrid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'RolesTab',
    components: {
        RolesGrid,
        CenterViewTemplate,
    },
};
</script>
