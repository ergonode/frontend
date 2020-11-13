/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="list-element-description">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'ListElementDescription',
};
</script>

<style lang="scss" scoped>
    .list-element-description {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        margin: 4px;
        word-break: break-word;
    }
</style>
