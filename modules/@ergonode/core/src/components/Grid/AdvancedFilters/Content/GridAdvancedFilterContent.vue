/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-advanced-filter-content">
        <GridAdvancedFilterShowOnly
            :value="value"
            @input="onValueChange" />
        <Divider />
        <slot v-if="!value" />
    </div>
</template>

<script>
import Divider from '@Core/components/Dividers/Divider';
import GridAdvancedFilterShowOnly from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilterShowOnly';

export default {
    name: 'GridAdvancedFilterContent',
    components: {
        GridAdvancedFilterShowOnly,
        Divider,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onValueChange() {
            this.$emit('input', !this.value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-advanced-filter-content {
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
</style>
