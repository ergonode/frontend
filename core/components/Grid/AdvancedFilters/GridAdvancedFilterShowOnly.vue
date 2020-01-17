/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="show-only-content">
        <Toggler
            :value="value"
            label="Show only empty records"
            @input="onValueChange" />
    </div>
</template>

<script>
import Toggler from '~/core/components/Inputs/Toggler/Toggler';

export default {
    name: 'GridAdvancedFilterShowOnly',
    components: {
        Toggler,
    },
    props: {
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
    .show-only-content {
        padding: 8px 12px;

        &__title {
            color: $GRAPHITE;
        }
    }
</style>
