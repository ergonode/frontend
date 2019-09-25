/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
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
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        overflow: hidden;
    }
</style>
