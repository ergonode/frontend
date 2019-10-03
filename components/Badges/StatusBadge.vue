/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="status-badge"
        :style="{backgroundColor: color}" />
</template>

<script>
export default {
    name: 'StatusBadge',
    props: {
        color: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .status-badge {
        width: 12px;
        height: 12px;
        border-radius: 6px;
    }
</style>
