/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
    },
    computed: {
        classes() {
            return [
                'advanced-filter-content',
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
    }
</style>
