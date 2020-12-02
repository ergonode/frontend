/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AdvancedFilterContent',
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
