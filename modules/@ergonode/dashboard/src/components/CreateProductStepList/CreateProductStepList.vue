/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ul class="progress-list">
        <slot />
    </ul>
</template>

<script>
export default {
    name: 'CreateProductStepList',
};
</script>

<style lang="scss" scoped>
    .progress-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(186px, 1fr));
    }
</style>
