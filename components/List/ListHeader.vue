/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-wrapper">
        <span
            class="header typo-list txt--dark-graphite"
            v-text="header" />
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ListHeader',
    props: {
        header: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-wrapper {
        display: grid;
        row-gap: 8px;
        column-gap: 16px;
        align-items: center;
        padding: 16px;

        .header {
            grid-column: 1;
            grid-row: 1;
        }
    }
</style>
