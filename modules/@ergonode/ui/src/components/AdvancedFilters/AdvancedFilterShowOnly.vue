/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="advanced-filter-show-only">
        <Toggler
            :value="value"
            label="Show only empty records"
            @input="onValueChange" />
    </div>
</template>

<script>

export default {
    name: 'AdvancedFilterShowOnly',
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
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filter-show-only {
        padding: 8px 12px;

        &__title {
            color: $GRAPHITE;
        }
    }
</style>
