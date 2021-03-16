/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <td class="table-row-cell">
        <slot />
    </td>
</template>

<script>
export default {
    name: 'TableRowCell',
};
</script>

<style lang="scss" scoped>
    .table-row-cell {
        padding: 12px;
        box-sizing: border-box;
        background-color: $WHITE;
        border-left: $BORDER_1_GREY;
    }
</style>
