/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="check-cell">
        <CheckBox
            :value="value"
            :disabled="disabled"
            @input="onSelect" />
    </div>
</template>

<script>

export default {
    name: 'GridPresentationCheckCell',
    components: {
        CheckBox: () => import('@Core/components/Inputs/CheckBox'),
    },
    props: {
        value: {
            type: [Boolean, Number],
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
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        padding: 8px;
    }
</style>
