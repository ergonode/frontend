/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <CategoriesGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CategoriesGrid from '@Categories/components/Grids/CategoriesGrid';

export default {
    name: 'CategoriesTab',
    components: {
        CategoriesGrid,
    },
};
</script>
