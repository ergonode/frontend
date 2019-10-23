/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="grid__ghost-item" />
</template>
<script>
export default {
    name: 'TemplateGridGhostItem',
};
</script>

<style lang="scss" scoped>
    .grid__ghost-item {
        display: flex;
        grid-column: 1 / 4;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        background-color: $GREEN;
        box-shadow:
            inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
            inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }
</style>
