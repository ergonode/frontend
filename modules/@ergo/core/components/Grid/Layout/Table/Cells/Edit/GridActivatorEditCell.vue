/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="activator-edit-cell">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridActivatorEditCell',
};
</script>

<style lang="scss" scoped>
    .activator-edit-cell {
        position: absolute;
        top: 0;
        left: 0;
        z-index: $Z_INDEX_LVL_4;
        display: flex;
        justify-content: center;
    }
</style>
