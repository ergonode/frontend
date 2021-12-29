/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="products-advanced-filters">
        <AdvancedFilters
            v-bind="$attrs"
            v-on="$listeners" />
    </div>
</template>

<script>
import AdvancedFilters from '@UI/components/AdvancedFilters/AdvancedFilters';

export default {
    name: 'ProductAdvancedFilters',
    components: {
        AdvancedFilters,
    },
    inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
    .products-advanced-filters {
        margin-left: 16px;
    }
</style>
