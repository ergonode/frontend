/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <UnitsGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import UnitsGrid from '@Core/components/Grids/UnitsGrid';

export default {
    name: 'UnitSettingsTab',
    components: {
        UnitsGrid,
    },
};
</script>
