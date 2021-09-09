/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="side-bar-sticky-header">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'SideBarStickyHeader',
};
</script>

<style lang="scss" scoped>
    .side-bar-sticky-header {
        position: sticky;
        top: 0;
        z-index: $Z_INDEX_LVL_1;
        display: flex;
        flex-direction: column;
        background-color: $WHITE;
    }
</style>
