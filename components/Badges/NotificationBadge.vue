/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-badge">
        <span
            class="font--semi-bold-10-12"
            v-text="info" />
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
    computed: {
        info() {
            return this.number > 99 ? '+99' : this.number;
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-badge {
        position: absolute;
        top: 8px;
        right: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 16px;
        height: 16px;
        box-sizing: border-box;
        border-radius: 999px;
        background-color: $RED;
        color: $WHITE;
    }
</style>
