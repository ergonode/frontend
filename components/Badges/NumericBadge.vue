/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="numeric-badge">
        <span v-text="number" />
    </div>
</template>

<script>
export default {
    name: 'NumericBadge',
    props: {
        number: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .numeric-badge {
        @include setFont(semiBold, tiny, regular, $white);

        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: $primary;
    }
</style>
