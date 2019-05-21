/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="action-wrapper">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'ListElementAction',
};
</script>

<style lang="scss" scoped>
    .action-wrapper {
        display: flex;
        flex: 0;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 8px;
    }
</style>
