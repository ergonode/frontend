/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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

export default {
    name: 'AttributesTab',
    components: {
        AttributesGrid,
    },
};
</script>
