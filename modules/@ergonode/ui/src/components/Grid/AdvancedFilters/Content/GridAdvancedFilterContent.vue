/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <GridAdvancedFilterShowOnly
            :value="value"
            @input="onValueChange" />
        <Divider />
        <slot v-if="!value" />
    </div>
</template>

<script>
import Divider from '@UI/components/Dividers/Divider';
import GridAdvancedFilterShowOnly from '@UI/components/Grid/AdvancedFilters/GridAdvancedFilterShowOnly';

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
        /**
         * Determines whether content of dropdown has fixed height and width or not
         */
        fixed: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'grid-advanced-filter-content',
                {
                    'grid-advanced-filter-content--fixed': this.fixed,
                },
            ];
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

        &--fixed {
            max-height: 200px;
        }
    }
</style>
