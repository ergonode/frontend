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
    name: 'PointBadge',
    props: {
        color: {
            type: String,
            required: true,
            validator: (value) => /^#([A-Fa-f0-9]{6})$/.test(value),
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
