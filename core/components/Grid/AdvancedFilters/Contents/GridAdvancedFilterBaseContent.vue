/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="filter-content">
        <GridAdvancedFilterShowOnly
            :value="isEmptyRecord"
            @input="onValueChange" />
        <Divider />
        <slot v-if="!isEmptyRecord" />
    </div>
</template>

<script>
import GridAdvancedFilterShowOnly from '~/core/components/Grid/AdvancedFilters/GridAdvancedFilterShowOnly';
import Divider from '~/components/Dividers/Divider';

export default {
    name: 'GridAdvancedFilterBaseContent',
    components: {
        GridAdvancedFilterShowOnly,
        Divider,
    },
    props: {
        isEmptyRecord: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        onValueChange() {
            this.$emit('input', !this.isEmptyRecord);
        },
    },
};
</script>

<style lang="scss" scoped>
    .filter-content {
        display: flex;
        flex-direction: column;
    }
</style>
