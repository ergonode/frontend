/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="vertical-fixed-scroll">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'VerticalFixedScroll',
};
</script>

<style lang="scss" scoped>
    .vertical-fixed-scroll {
        flex: 1 1 auto;
        height: 0;
        overflow: auto;
    }
</style>
