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
        box-shadow: $ELEVATOR_HOLE;
    }
</style>
