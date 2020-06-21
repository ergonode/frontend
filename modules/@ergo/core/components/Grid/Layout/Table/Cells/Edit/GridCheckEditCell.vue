/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CheckBox
        class="check-cell"
        :value="value"
        :disabled="disabled"
        @input="onSelect" />
</template>

<script>

import CheckBox from '@Core/components/Inputs/CheckBox';

export default {
    name: 'GridCheckEditCell',
    components: {
        CheckBox,
    },
    props: {
        value: {
            type: [
                Boolean,
                Number,
            ],
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onSelect(value) {
            this.$emit('input', value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .check-cell {
        margin: 12px;
    }
</style>
