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
import AttributeGroupsGrid from '@Attributes/components/Grids/AttributeGroupsGrid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'AttributeGroupsTab',
    components: {
        AttributeGroupsGrid,
        CenterViewTemplate,
    },
};
</script>
