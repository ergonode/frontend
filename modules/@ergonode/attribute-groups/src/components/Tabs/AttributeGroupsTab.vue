/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <AttributeGroupsGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import AttributeGroupsGrid from '@AttributeGroups/components/Grids/AttributeGroupsGrid';

export default {
    name: 'AttributeGroupsTab',
    components: {
        AttributeGroupsGrid,
    },
};
</script>
