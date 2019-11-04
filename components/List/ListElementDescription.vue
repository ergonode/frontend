/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="element-description">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'ListElementDescription',
};
</script>

<style lang="scss" scoped>
    .element-description {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        margin: 0 4px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
</style>
