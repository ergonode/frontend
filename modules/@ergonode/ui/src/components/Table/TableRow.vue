/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <tr class="table-row">
        <slot />
    </tr>
</template>

<script>

export default {
    name: 'TableRow',
};
</script>

<style lang="scss" scoped>
    .table-row {
        border: $BORDER_1_GREY;
    }
</style>
