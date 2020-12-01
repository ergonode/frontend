/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <AdvancedFilterShowOnly
            :value="value"
            @input="onValueChange" />
        <Divider />
        <slot v-if="!value" />
    </div>
</template>

<script>
import AdvancedFilterShowOnly from '@UI/components/AdvancedFilters/AdvancedFilterShowOnly';
import Divider from '@UI/components/Dividers/Divider';

export default {
    name: 'AdvancedFilterContent',
    components: {
        AdvancedFilterShowOnly,
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
                'advanced-filter-content',
                {
                    'advanced-filter-content--fixed': this.fixed,
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
    .advanced-filter-content {
        display: flex;
        flex-direction: column;

        &--fixed {
            max-height: 200px;
        }
    }
</style>
