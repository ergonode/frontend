/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-advanced-filter-show-only">
        <Toggler
            :value="value"
            label="Show only empty records"
            @input="onValueChange" />
    </div>
</template>

<script>
import Toggler from '@UI/components/Toggler/Toggler';

export default {
    name: 'GridAdvancedFilterShowOnly',
    components: {
        Toggler,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Boolean,
            required: true,
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
    .grid-advanced-filter-show-only {
        padding: 8px 12px;

        &__title {
            color: $GRAPHITE;
        }
    }
</style>
