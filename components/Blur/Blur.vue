/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="blur" />
</template>

<script>
export default {
    name: 'Blur',
};
</script>

<style lang="scss" scoped>
    .blur {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: $white;
        opacity: 0.6;
    }
</style>
