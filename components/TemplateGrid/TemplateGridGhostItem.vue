/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid__ghost-item" />
</template>
<script>

export default {
    name: 'TemplateGridGhostItem',
};
</script>

<style lang="scss" scoped>
    .grid__ghost-item {
        position: relative;
        display: flex;
        flex: 1;
        justify-content: flex-start;
        align-items: center;
        width: 0;
        height: 100%;
        background-color: $primary;
        box-shadow:
            inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
            inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }
</style>
