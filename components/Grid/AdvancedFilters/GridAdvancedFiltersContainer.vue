/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="advanced-filters-container">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridAdvancedFiltersContainer',
};
</script>

<style lang="scss" scoped>
    .advanced-filters-container {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 8px;
        overflow: auto;

        & > * {
            margin: 0 8px 8px 0;
        }
    }
</style>
