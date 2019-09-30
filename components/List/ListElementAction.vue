/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="element-action">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'ListElementAction',
};
</script>

<style lang="scss" scoped>
    .element-action {
        display: flex;
        flex: 0;
        justify-content: center;
        align-items: center;
    }
</style>
