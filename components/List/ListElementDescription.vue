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
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
</style>
