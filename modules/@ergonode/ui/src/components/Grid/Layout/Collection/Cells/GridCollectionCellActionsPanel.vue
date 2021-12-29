/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-collection-cell-actions-panel">
        <div class="grid-collection-cell-actions-panel__container">
            <slot name="prepend" />
        </div>
        <slot />
        <div class="grid-collection-cell-actions-panel__container">
            <slot name="append" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridCollectionCellActionsPanel',
};
</script>

<style lang="scss" scoped>
    .grid-collection-cell-actions-panel {
        position: absolute;
        top: 8px;
        left: 8px;
        right: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__container {
            display: flex;
            align-items: center;
            column-gap: 8px;
        }
    }
</style>
