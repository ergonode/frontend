/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="list">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'List',
};
</script>

<style lang="scss" scoped>
    .list {
        $list: &;

        position: relative;
        flex: 1;
        overflow: auto;
    }
</style>
