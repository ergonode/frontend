/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span class="list-element-icon">
        <slot />
    </span>
</template>

<script>
export default {
    name: 'ListElementIcon',
};
</script>

<style lang="scss" scoped>
    .list-element-icon {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-width: 24px;
        min-height: 24px;
        margin-right: 4px;
    }
</style>
