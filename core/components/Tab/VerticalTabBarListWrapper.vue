/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="list-wrapper">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'VerticalTabBarListWrapper',
};
</script>

<style lang="scss" scoped>
    .list-wrapper {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 275px;
    }
</style>
