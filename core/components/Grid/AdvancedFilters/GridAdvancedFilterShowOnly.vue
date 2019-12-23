/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="show-only-content">
        <Toggler
            :value="value"
            @input="onValueChange" />
        <span class="show-only-content__title font--semi-bold-12-16">
            Show only empty records
        </span>
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
        display: grid;
        grid-template-columns: max-content;
        grid-auto-flow: column;
        column-gap: 8px;
        padding: 8px 12px;

        &__title {
            color: $GRAPHITE;
        }
    }
</style>
