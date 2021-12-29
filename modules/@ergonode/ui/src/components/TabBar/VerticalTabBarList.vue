/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="vertical-tab-bar-list">
        <div class="vertical-tab-bar-list__container">
            <slot />
        </div>
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
        width: 248px;
        box-sizing: border-box;

        &__container {
            position: relative;
            flex: 1 1 auto;
            width: 100%;
            height: 0;
        }
    }
</style>
