/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="horizontal-fixed-scroll">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'HorizontalFixedScroll',
};
</script>

<style lang="scss" scoped>
    .horizontal-fixed-scroll {
        flex: 1 1 auto;
        width: 0;
        overflow: auto;
    }
</style>
