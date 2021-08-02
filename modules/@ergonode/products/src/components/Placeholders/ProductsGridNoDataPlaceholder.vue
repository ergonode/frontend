/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridNoDataPlaceholder
        :title="$t('@Products.product._.noProduct')"
        :subtitle="$t('@Products.product._.createFirst')">
        <template #action>
            <CreateProductButton />
        </template>
    </GridNoDataPlaceholder>
</template>

<script>
import CreateProductButton from '@Products/components/Buttons/CreateProductButton';

export default {
    name: 'ProductsGridNoDataPlaceholder',
    components: {
        CreateProductButton,
    },
};
</script>
