/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div
        class="status-badge"
        :style="{backgroundColor: props.color}" />
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
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
</style>
