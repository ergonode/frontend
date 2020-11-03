/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="check-placeholder-cell">
        <IconArrowDropdown />
    </div>
</template>

<script>
import IconArrowDropdown from '@UI/components/Icons/Arrows/IconArrowDropdown';

export default {
    name: 'GridCheckPlaceholderCell',
    components: {
        IconArrowDropdown,
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
