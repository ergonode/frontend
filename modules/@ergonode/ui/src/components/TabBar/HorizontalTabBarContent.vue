/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="horizontal-tab-bar-content">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'HorizontalTabBarContent',
};
</script>

<style lang="scss" scoped>
    .horizontal-tab-bar-content {
        display: flex;
        border-top: $BORDER_1_GREY;
        height: 100%;
        background-color: $WHITE;
    }
</style>
