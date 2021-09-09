/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <CollectionProductsGrid
                :scope="scope"
                :errors="errors"
                :change-values="changeValues" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CollectionProductsGrid from '@Collections/components/Grids/CollectionProductsGrid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'CollectionProductsTab',
    components: {
        CollectionProductsGrid,
        CenterViewTemplate,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
        changeValues: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
