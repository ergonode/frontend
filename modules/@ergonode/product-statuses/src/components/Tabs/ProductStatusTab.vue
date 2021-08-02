/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <ProductStatusesGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ProductStatusesGrid from '@Statuses/components/Grids/ProductStatusesGrid';

export default {
    name: 'ProductStatusTab',
    components: {
        ProductStatusesGrid,
    },
};
</script>
