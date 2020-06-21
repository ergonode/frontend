/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="bool-presentation-cell">
        <Toggler
            :value="Boolean(value)"
            :disabled="isDisabled"
            @input="onValueChange" />
    </div>
</template>

<script>

import Toggler from '@Core/components/Inputs/Toggler/Toggler';

export default {
    name: 'GridBoolEditCell',
    components: {
        Toggler,
    },
    props: {
        value: {
            type: [
                Boolean,
                Number,
            ],
            default: false,
        },
        isDisabled: {
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
    .bool-presentation-cell {
        display: flex;
        align-items: center;
        padding: 8px;
    }
</style>
