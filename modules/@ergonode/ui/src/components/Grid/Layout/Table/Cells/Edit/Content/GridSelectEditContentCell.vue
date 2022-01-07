/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-select-edit-content-cell">
        <slot />
    </div>
</template>

<script>
/**
 * @deprecated since 1.2.0 - replaced by GridEditContentCell
 */
export default {
    name: 'GridSelectEditContentCell',
};
</script>

<style lang="scss" scoped>
    .grid-select-edit-content-cell {
        position: fixed;
        z-index: $Z_INDEX_LVL_7;
    }
</style>
