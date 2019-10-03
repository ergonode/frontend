/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="filter-content">
        <GridAdvancedFilterShowOnly v-model="showOnlyEmptyRecords" />
        <Divider />
        <slot v-if="!showOnlyEmptyRecords" />
    </div>
</template>

<script>
import GridAdvancedFilterShowOnly from '~/components/Grid/AdvancedFilters/GridAdvancedFilterShowOnly';
import Divider from '~/components/Dividers/Divider';

export default {
    name: 'GridAdvancedFilterBaseContent',
    components: {
        GridAdvancedFilterShowOnly,
        Divider,
    },
    data() {
        return {
            showOnlyEmptyRecords: false,
        };
    },
};
</script>

<style lang="scss" scoped>
    .filter-content {
        display: flex;
        flex-direction: column;
    }
</style>
