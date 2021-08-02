/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <ProductHistoryGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ProductHistoryGrid from '@Products/components/Grids/ProductHistoryGrid';

export default {
    name: 'ProductHistoryTab',
    components: {
        ProductHistoryGrid,
    },
};
</script>
