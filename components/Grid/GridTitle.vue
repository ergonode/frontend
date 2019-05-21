/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span class="grid__title">
        {{ title }}
    </span>
</template>

<script>
export default {
    name: 'GridTitle',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid__title {
        @include setFont(medium, small, regular, $lightGraphite);
        font-display: swap;
    }
</style>
