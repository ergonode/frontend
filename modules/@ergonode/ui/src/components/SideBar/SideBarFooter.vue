/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="side-bar-footer">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'SideBarFooter',
};
</script>

<style lang="scss" scoped>
    .side-bar-footer {
        height: 40px;
    }
</style>
