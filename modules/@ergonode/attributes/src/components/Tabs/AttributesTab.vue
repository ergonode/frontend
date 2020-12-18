/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <AttributesGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import AttributesGrid from '@Attributes/components/Grids/AttributesGrid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'AttributesTab',
    components: {
        CenterViewTemplate,
        AttributesGrid,
    },
};
</script>
