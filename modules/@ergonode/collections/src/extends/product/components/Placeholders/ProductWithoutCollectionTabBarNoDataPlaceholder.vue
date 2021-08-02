/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TabBarNoDataPlaceholder
        :title="$t('@Collections.productExtend.components.ProductWithoutCollectionTabBarNoDataPlaceholder.title')"
        :subtitle="$t('@Collections.productExtend.components.ProductWithoutCollectionTabBarNoDataPlaceholder.subtitle')">
        <template #action>
            <NavigateToCollectionsButton />
        </template>
    </TabBarNoDataPlaceholder>
</template>

<script>
import NavigateToCollectionsButton from '@Collections/extends/product/components/Buttons/NavigateToCollectionsButton';

export default {
    name: 'ProductWithoutCollectionTabBarNoDataPlaceholder',
    components: {
        NavigateToCollectionsButton,
    },
};
</script>
