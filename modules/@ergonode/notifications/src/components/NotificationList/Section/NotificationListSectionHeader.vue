/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list-section-header">
        <span v-text="title" />
        <slot name="append" />
    </div>
</template>

<script>
export default {
    name: 'NotificationListSectionHeader',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;
        min-height: 40px;
        color: $GRAPHITE_DARK;
        font: $FONT_SEMI_BOLD_16_24;
    }
</style>
