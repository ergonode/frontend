/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="check-placeholder-cell">
        <IconArrowDropDown />
    </div>
</template>

<script>
export default {
    name: 'GridCheckPlaceholderCell',
    components: {
        IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
    },
};
</script>

<style lang="scss" scoped>
    .check-placeholder-cell {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
    }
</style>
