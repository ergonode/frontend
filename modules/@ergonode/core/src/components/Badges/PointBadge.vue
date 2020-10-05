/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="point-badge"
        :style="{backgroundColor: color}" />
</template>

<script>
export default {
    name: 'PointBadge',
    props: {
        color: {
            type: String,
            required: true,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
    },
};
</script>

<style lang="scss" scoped>
    .point-badge {
        flex-shrink: 0;
        width: 10px;
        height: 10px;
        border-radius: 5px;
    }
</style>
