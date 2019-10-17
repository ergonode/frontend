/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="edit-header-cell">
        <IconEdit />
    </div>
</template>

<script>
export default {
    name: 'GridEditHeaderCell',
    components: {
        IconEdit: () => import('~/components/Icon/Actions/IconEdit'),
    },
};
</script>

<style lang="scss" scoped>
    .edit-header-cell {
        display: flex;
        flex: 1 1 auto;
        justify-content: center;
        align-items: center;
        user-select: none;
    }
</style>
