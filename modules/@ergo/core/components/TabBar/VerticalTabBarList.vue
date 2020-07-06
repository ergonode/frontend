/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="vertical-tab-bar-list">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'VerticalTabBarList',
};
</script>

<style lang="scss" scoped>
    .vertical-tab-bar-list {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 275px;
    }
</style>
