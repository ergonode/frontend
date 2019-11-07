/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="check-cell">
        <CheckBox
            :value="value"
            @input="onSelect" />
    </div>
</template>

<script>

export default {
    name: 'GridCheckCell',
    components: {
        CheckBox: () => import('~/components/Inputs/CheckBox'),
    },
    props: {
        value: {
            type: [Boolean, Number],
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
        margin: 8px;
    }
</style>
