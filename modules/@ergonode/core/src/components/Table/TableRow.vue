/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
        border: 1px solid $GREY;
    }
</style>
