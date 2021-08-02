/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="preloader">
        <IconLoader
            :width="48"
            :height="48" />
    </div>
</template>

<script>

export default {
    name: 'Preloader',
};
</script>

<style lang="scss" scoped>
    .preloader {
        z-index: $Z_INDEX_LVL_1;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        padding: 24px;
    }
</style>
